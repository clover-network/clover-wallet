import Web3 from 'web3';
import * as status from '../../lib/constants/api';
import * as MessageTypes from '../../lib/constants/message-types';
import axios from 'axios';
import * as DAppService from './dapp-service';
import { getStore } from '../store/store-provider';
import * as TransactionService from './transaction-service'

const baseUrl = 'http://localhost:9933'
const web3 = new Web3(baseUrl);
// use below messages if no return message is needed
export const success = {
  status: status.SUCCESS,
  message: 'success',
};
// return a failure ...
export const failure = {
  status: status.FAILURE,
  message: 'failed',
};

export const resultInfo = {
  jsonrpc: '2.0',
};

export const requestId = {
  eth_getBlockByNumber: 1,
  eth_getBlockByHash: 1,
  eth_accounts: 1,
  net_version: 67,
  eth_getBalance: 1,
};

export const handleDefault = async (request, sendResponse) => {
  let response;
  try {
    response = await axios.post(baseUrl, request.opts)
    response = { ...success, method: request.opts.method, result: response.data }
  } catch (e) {
    response = {
      ...failure,
      message: `${request.opts.method} Failed`,
    };
  }

  // console.log(`default web3 ${request.opts.method} response result:`, response);
  sendResponse(response);
};

export const handleProcessingError = async (request, sendResponse) => {
  const response = {
    ...failure,
    message: 'Error while processing request.Check message type',
  };
  sendResponse(response);
};

const buildResult = (id, response) => ({
  id: id || 1,
  jsonrpc: '2.0',
  result: response,
});

export const web3SignAndSend = async (request, sender, sendResponse) => {
  const signedTransaction = await web3.eth.accounts.signTransaction(
    request.request.request.opts.params[0],
    '0xa504b64992e478a6846670237a68ad89b6e42e90de0490273e28e74f084c03c8',
  );
  let result = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  result = buildResult(request.request.request.opts.id, result);
  TransactionService.updateWeb3Transactions(result)
  DAppService.sendPopupResponse({ ...success, result }, sender, sendResponse);
  await DAppService.closeRequestAndReplyDApp(request.request.id, result);
}

export const cancelRequest = async (request, sender, sendResponse) => {
  let result = buildResult(request.request.request.opts.id, {error: 1});
  TransactionService.updateWeb3Transactions(result)
  DAppService.sendPopupResponse({ ...success, result: true }, sender, sendResponse);
  await DAppService.closeRequestAndReplyDApp(request.request.id, {...failure, message: 'The request was cancelled.', id: request.request.request.opts.id});
}

export const web3Response = async (request, sender, sendResponse) => {
  let result;
  let transHash;
  if (MessageTypes.SAFE_METHODS.includes(request.opts.method) || request.opts.method === 'eth_accounts') {
    try {
      switch (request.opts.method) {
        case 'eth_accounts':
          result = ['0xe6206C7f064c7d77C6d8e3eD8601c9AA435419cE'];
          result = buildResult(request.opts.id, result);
          sendResponse({ ...success, method: request.opts.method, result });
          break;
        case 'eth_sendTransaction':
          result = await DAppService.queueDAppRequests(request, sender, {});
          
          let unsubscribe = getStore().subscribe(() => {
            let { web3TransactionArr }  = getStore().getState().transactionState
            if (web3TransactionArr && web3TransactionArr.find((t) => t.id === request.opts.id)) {
              let t = web3TransactionArr.find((t) => t.id === request.opts.id)
              unsubscribe();
              if (!t.result.error) {
                sendResponse({ ...success, method: request.opts.method, result: t});
              } else {
                sendResponse({ ...failure, message: 'The request was cancelled.', method: request.opts.method, result: t});
              }
              
            }
          })
          
          // const signedTransaction = await web3.eth.accounts.signTransaction(
          //   request.opts.params[0],
          //   '0xa504b64992e478a6846670237a68ad89b6e42e90de0490273e28e74f084c03c8',
          // );
          // result = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
          // result = buildResult(request.opts.id, result);
          // sendResponse({ ...success, method: request.opts.method, result });
          break;
        case 'eth_getTransactionReceipt':
          transHash = typeof request.opts.params[0] === 'string'
            ? request.opts.params[0]
            : request.opts.params[0].transactionHash;
          result = await web3.eth.getTransactionReceipt(transHash);
          result = buildResult(request.opts.id, result);
          sendResponse({ ...success, method: request.opts.method, result });
          break;
        case 'eth_getTransactionByHash':
          transHash = typeof request.opts.params[0] === 'string'
            ? request.opts.params[0]
            : request.opts.params[0].transactionHash;
          result = await web3.eth.getTransaction(transHash);
          result = buildResult(request.opts.id, result);
          sendResponse({ ...success, method: request.opts.method, result });
          break;
        default:
          handleDefault(request, sendResponse);
      }
      // console.log(`web3 ${request.opts.method} response result:`, result);
    } catch (e) {
      sendResponse({ ...failure, message: 'Error in web3Response.' });
    }
  } else {
    handleProcessingError(request, sendResponse);
  }
  
};
