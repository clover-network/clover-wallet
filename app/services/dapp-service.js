import * as ApiType from '../api';

export const submitTransaction = async transactionObj => {
  const {
    request: { opts },
  } = transactionObj;

  const dApp = true;
  await ApiType.DApp.submitTransaction(opts, transactionObj, dApp);
};

export const signMessage = async data => {
  await ApiType.DApp.signMessage(data);
};

export const signWeb3Message = async data => {
  await ApiType.DApp.signWeb3Message(data);
}