// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Keyring, setSS58Format, encodeAddress, decodeAddress
} from '@polkadot/keyring';
import {
  formatBalance, isHex, hexToU8a, u8aToHex, u8aToString,u8aWrapBytes
} from '@polkadot/util';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { connectToApi,getApi } from '../api';
import { SUCCESS, FAILURE } from '../../../lib/constants/api';
import * as ChainApi from '../chain';
export const getAddress = (seedWords, keypairType) => {
  try {
    setSS58Format(42);
    const keyring = new Keyring({ type: keypairType });
    const pairAlice = keyring.addFromUri(seedWords);
    const { address } = pairAlice;
    return address;
  } catch (err) {
    throw new Error('Error in fuso getAddress');
  }
};

export const createSeedWords = () => mnemonicGenerate();

export const valueFormatter = (value, token = 'TAO') => {
  try {
    formatBalance.setDefaults({ unit: token });
    const fBalance = formatBalance(value, true, 18);
    return fBalance;
  } catch (err) {
    throw new Error('Error in fuso valueFormatter');
  }
};

export const isValidAddress = value => {
  try {
    encodeAddress(isHex(value) ? hexToU8a(value) : decodeAddress(value));
    return true;
  } catch (error) {
    return false;
  }
};
export const checkToken = async (address,tokenId,network) => {
  await connectToApi(network);
  const api = getApi();
  const data = await api.query.token.balances([tokenId,address]);
  return data.isEmpty;
}
export const getNextTokenId = async (tokenId,network) =>{
  await connectToApi(network);
  const api = getApi();
  const data = await api.query.token.nextTokenId();
  const nextId = data.toString();
  if(Number(tokenId) < Number(nextId)){
    return true;
  }else {
    return false;
  }
}
export const getTokenName = async (tokenId,network) => {
  await connectToApi(network);
  const api = getApi();
  const data = await api.query.token.tokens(Number(tokenId));
  const tokenObj = JSON.parse(data.toString());
  return tokenObj.symbol;
}
const getTokenBalance = async (address,tokenId,tokenName,api_) => {
  const api = api_;
  const data = await api.query.token.balances([Number(tokenId),address]);
  const balance = data.free.toString();
  const reserved = data.reserved.toString();
  const decimals = ChainApi.getTokenDecimals();
  const token = ChainApi.getTokenSymbol();
  formatBalance.setDefaults({ unit: token });
  const balanceFormatted = formatBalance(balance, true, decimals);
  const taoBalance = formatBalance(balance, { forceUnit: token, withSi: true }, decimals).replace(` ${token}`, '');
  const taoReserved = formatBalance(reserved, { forceUnit: token, withSi: true }, decimals).replace(` ${token}`, '');
  const total = Number(balance)+Number(reserved);
  const totalAssets = formatBalance(toolNumber(total), { forceUnit: token, withSi: true }, decimals).replace(` ${token}`, '');
  const taoTotalAssets = thousands(totalAssets);
  const obj =  {
    token:tokenName,
    originalReserved:reserved.toString(),
    reserved:taoReserved,
    originalTaoTotal:totalAssets.toString(),
    taoTotal:taoTotalAssets,
    balance: balance.toString(),
    amount: taoBalance,
    marketData: '0.00',
    balanceFormatted,
  };
  return obj
}
export const getBalance = async address => {
  try {
    const api = getApi();
    const { data } = await api.query.system.account(address);
    const balance = data.free.toString();
    const reserved = data.reserved.toString();
    const decimals = ChainApi.getTokenDecimals();
    const token = ChainApi.getTokenSymbol();
    formatBalance.setDefaults({ unit: token });
    const balanceFormatted = formatBalance(balance, true, decimals);
    const taoBalance = formatBalance(balance, { forceUnit: token, withSi: true }, decimals).replace(` ${token}`, '');
    const taoReserved = formatBalance(reserved, { forceUnit: token, withSi: true }, decimals).replace(` ${token}`, '');
    const total = Number(balance)+Number(reserved);
    const totalAssets = formatBalance(toolNumber(total), { forceUnit: token, withSi: true }, decimals).replace(` ${token}`, '');
    const taoTotalAssets = thousands(totalAssets);

    const tokenList = JSON.parse(localStorage.getItem("tokenList")) || [];
    const balanceObj = {
      address,
      tokens: [
        {
          token,
          originalReserved:reserved.toString(),
          reserved:taoReserved,
          originalTaoTotal:totalAssets.toString(),
          taoTotal:taoTotalAssets,
          balance: balance.toString(),
          amount: taoBalance,
          marketData: '0.00',
          balanceFormatted,
        }
      ],
      status: SUCCESS,
    };
    if(tokenList.length){
      for(let item of tokenList){
        let obj = await getTokenBalance(address,item.tokenId,item.tokenName,api);
        balanceObj.tokens.push(obj);
      }
    }
    return balanceObj;
  } catch (err) {
    // const network = JSON.parse(localStorage.getItem("network"));
    // await connectToApi(network);
    const balanceObj = {
      address,
      tokens: [
        {
          token: 'TAO',
          reserved:'--',
          balance: '0',
          amount: '--',
          taoTotal:"--",
          marketData: '0',
          balanceFormatted: formatBalance('0', true, 18),
        },
      ],
      status: FAILURE,
    };
    return balanceObj;
  }
};

export const getAccountPair = async (keypairType, seedWords) => {
  const keyring = new Keyring({ type: keypairType });
  const accountPair = keyring.addFromUri(seedWords);
  return accountPair;
};

export const getAccountForUI = account => ({
  address: account.address,
  alias: account.alias,
  keypairType: account.keypairType,
});

export const getSignMessage = async (account, message) => {
  const { seedWords, keypairType } = account;
  const accountPair = await getAccountPair(keypairType, seedWords);
  const signedMessage = u8aToHex(accountPair.sign(u8aWrapBytes(message.message)));
  const result = {
    account: getAccountForUI(account),
    message: {
      ...message,
      signedMessage,
    },
  };
  return result;
};

export const getStringMessageFromHex = message => u8aToString(hexToU8a(message));
function thousands(num){
  var str = num.toString();
  var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
  return str.replace(reg,"$1,");
}

const toolNumber = (param) => {
	let strParam = String(param)
	let flag = /e/.test(strParam)
	if (!flag) return param
  
	// 指数符号 true: 正，false: 负
	let sysbol = true
	if (/e-/.test(strParam)) {
	  sysbol = false
	}
	// 指数
	let index = Number(strParam.match(/\d+$/)[0])
	// 基数
	let basis = strParam.match(/^[\d\.]+/)[0].replace(/\./, '')
  
	if (sysbol) {
	  return basis.padEnd(index + 1, 0)
	} else {
	  return basis.padStart(index + basis.length, 0).replace(/^0/, '0.')
	}
}