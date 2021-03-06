/* This ia a bridge to relay messages between background and inPage scripts */
import extension from 'extensionizer';
import * as RequestTypes from '../../lib/constants/request-types';
import * as TransceiverService from '../services/transceiver-service';
import * as Web3TransceiverService from '../services/web3-transceiver-service';
import * as ResponseType from '../../lib/constants/response-types';

window.addEventListener('message', async event => {
  // We only accept messages from ourselves
  if (event.source !== window) return;
  if (event.data && event.data.requestType) {
    const { data } = event;
    try {
      switch (data.requestType) {
        case RequestTypes.ENABLE:
          TransceiverService.authorizeDApp(data);
          break;
        case RequestTypes.GET_ACCOUNTS:
          TransceiverService.getAccounts(data);
          break;
        case RequestTypes.SEND:
          TransceiverService.submitTransaction(data);
          break;
        case RequestTypes.SIGN_MESSAGE:
          TransceiverService.signMessage(data);
          break;
        case RequestTypes.WEB3_REQUEST:
          const { data } = event;
          if (
            !['eth_getBalance', 'eth_accounts', 'net_version', 'eth_getBlockByNumber'].includes(
              data.opts.method,
            )
          ) {
            console.log('cs:', data);
          }

          try {
            if (
              RequestTypes.SAFE_METHODS.includes(data.opts.method)
              || data.opts.method === 'eth_accounts'
            ) {
              Web3TransceiverService.handleMethod(data);
            } else {
              Web3TransceiverService.handleDefault(data);
            }
          } catch (err) {
            const error = { message: err.message, stack: err.stack || {} };
            Web3TransceiverService.handleError(error, data);
          }
          break;
        default:
          TransceiverService.handleDefault(data);
      }
    } catch (err) {
      const error = { message: err.message, stack: err.stack || {} };
      TransceiverService.handleError(error, data);
    }
  }
});

extension.runtime.onMessage.addListener(response => {
  console.log('content on message:', response);
  const { type } = response;
  switch (type) {
    case ResponseType.BG_DAPP_RESPONSE:
      TransceiverService.dAppResponse(response);
      break;
    case ResponseType.WEB3_RESPONSE:
      Web3TransceiverService.dAppResponse(response);
      break;
    default:
      TransceiverService.handleDefaultResponse(response);
  }
  return true;
});
