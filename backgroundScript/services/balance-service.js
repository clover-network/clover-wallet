import * as BalanceAction from '../actions/balances';
import { getWallet } from './wallet-service';
import { BAD_REQUEST } from '../../lib/constants/api';

const validateAddress = addresses => {
  if (!addresses) {
    return {
      status: BAD_REQUEST,
      message: 'The request requires addresses.',
    };
  }
};
export const getBalances = async addresses => {
  const vResult = validateAddress(addresses);
  if (vResult !== undefined) return vResult;

  const wallet = getWallet();
  const balanceArray = await Promise.all(
    addresses.map(async address => {
      const balance = await wallet.getBalance(address);
      return balance;
    }),
  );
  await BalanceAction.fetchAccountBalance(balanceArray);
  return balanceArray;
};

export const getBalance = async address => {
  const wallet = getWallet();
  console.log("wallet --- 2" , wallet);

  const balance = await wallet.getBalance(address);
  return balance;
};

export const valueFormatter = (value, token) => {
  const wallet = getWallet();
  console.log("wallet --- 3" , wallet);

  const fBalance = wallet.valueFormatter(value, token);
  return fBalance;
};
