import Web3 from 'web3';
import * as status from '../../lib/constants/api';

const web3 = new Web3('http://localhost:9933');
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
  const response = {
    ...failure,
    message: 'Invalid request.Check message type',
  };
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

export const web3Response = async (request, sendResponse) => {
  let result;
  let transHash;
  try {
    switch (request.opts.method) {
      case 'eth_getBalance':
        result = await web3.eth.getBalance(request.opts.params[0]);
        result = buildResult(request.opts.id, result);
        sendResponse({ ...success, method: request.opts.method, result });
        break;
      case 'eth_accounts':
        result = ['0xe6206C7f064c7d77C6d8e3eD8601c9AA435419cE'];
        result = buildResult(request.opts.id, result);
        sendResponse({ ...success, method: request.opts.method, result });
        break;
      case 'net_version':
        result = await web3.eth.net.getId();
        result = buildResult(request.opts.id, result);
        sendResponse({ ...success, method: request.opts.method, result });
        break;
      case 'eth_getBlockByNumber':
        result = await web3.eth.getBlock(request.opts.params[0], request.opts.params[1]);
        result = buildResult(request.opts.id, result);
        sendResponse({ ...success, method: request.opts.method, result });
        break;
      case 'eth_estimateGas':
        result = await web3.eth.estimateGas(request.opts.params[0]);
        result = buildResult(request.opts.id, result);
        sendResponse({ ...success, method: request.opts.method, result });
        break;
      case 'eth_gasPrice':
        result = await web3.eth.getGasPrice();
        result = buildResult(request.opts.id, result);
        sendResponse({ ...success, method: request.opts.method, result });
        break;
      case 'eth_sendTransaction':
        const signedTransaction = await web3.eth.accounts.signTransaction(
          request.opts.params[0],
          '0xa504b64992e478a6846670237a68ad89b6e42e90de0490273e28e74f084c03c8',
        );
        result = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        result = buildResult(request.opts.id, result);
        sendResponse({ ...success, method: request.opts.method, result });
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
      case 'eth_getCode':
        result = await web3.eth.getCode(request.opts.params[0], request.opts.params[1]);
        result = buildResult(request.opts.id, result);
        sendResponse({ ...success, method: request.opts.method, result });
        break;
      case 'eth_call':
        result = await web3.eth.call(request.opts.params[0], request.opts.params[1]);
        result = buildResult(request.opts.id, result);
        sendResponse({ ...success, method: request.opts.method, result });
        break;
      default:
        handleProcessingError(request, sendResponse);
    }
    // console.log(`web3 ${request.opts.method} response result:`, result);
  } catch (e) {
    sendResponse({ ...failure, message: 'Error in web3Response.' });
  }
};
