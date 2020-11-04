// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Keyring, setSS58Format, encodeAddress, decodeAddress
} from '@polkadot/keyring';
import {
  formatBalance, isHex, hexToU8a, u8aToHex, u8aToString
} from '@polkadot/util';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import _ from 'lodash';
import { getApi } from '../api';
import { SUCCESS, FAILURE } from '../../../lib/constants/api';

export const getAddress = (seedWords, keypairType) => {
  try {
    setSS58Format(42);
    const keyring = new Keyring({ type: keypairType });
    const pairAlice = keyring.addFromUri(seedWords);
    const { address } = pairAlice;
    return address;
  } catch (err) {
    throw new Error('Error in clover getAddress');
  }
};

export const createSeedWords = () => mnemonicGenerate();

export const valueFormatter = value => {
  try {
    formatBalance.setDefaults({ unit: 'CLV' });
    const fBalance = formatBalance(value, true, 12);
    return fBalance;
  } catch (err) {
    throw new Error('Error in clover valueFormatter');
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

export const getBalance = async address => {
  try {
    const api = getApi();
    const data = await api.rpc.clover.getBalance(address);
    const tokens = _.map(data, info => {
      const token = info[0].type;
      if (token === 'DOT') {
        return null;
      }
      const balance = info[1].toString();
      formatBalance.setDefaults({ unit: token });
      const balanceFormatted = formatBalance(balance, true, 12);
      const clvBalance = formatBalance(balance, { forceUnit: token, withSi: true }, 12);
      return {
        token,
        balance: balance.toString(),
        amount: clvBalance.replace(` ${token}`, ''),
        marketData: '0',
        balanceFormatted,
      };
    });
    const balanceObj = {
      address,
      tokens: _.filter(tokens, t => t),
      status: SUCCESS,
    };
    return balanceObj;
  } catch (err) {
    const balanceObj = {
      address,
      tokens: [
        {
          token: 'CLV',
          balance: '0',
          amount: '0',
          marketData: '0',
          balanceFormatted: formatBalance('0', true, 12),
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
  const signedMessage = u8aToHex(accountPair.sign(message.message));
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
