import extension from 'extensionizer';
import * as ResponseService from '../services/response-service';
import * as MessageTypes from '../../lib/constants/message-types';
import * as ExtensionApi from '../../lib/services/extension/extension';
import * as RuntimeApi from '../../lib/services/extension/runtime';
import * as Web3ResponseService from '../services/web3-response-service';

extension.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle Messages from content
  const { url: senderURL } = sender;
  const popupURL = ExtensionApi.getURL('popup.html');
  const windowURL = ExtensionApi.getURL('window.html');
  const { id: senderId } = sender;
  const extensionId = RuntimeApi.getID();

  // console.log('bg content:', request);
  if (senderId === extensionId) {
    if (senderURL !== popupURL && senderURL !== windowURL) {
      try {
        switch (request.type) {
          case MessageTypes.BG_DAPP_TXN_VALIDATE:
            ResponseService.handleDAppValidateTransaction(request, sender, sendResponse);
            break;
          case MessageTypes.BG_DAPP_AUTHORIZE:
            ResponseService.handleAuthorizeDApp(request, sender, sendResponse);
            break;
          case MessageTypes.BG_DAPP_GET_ACCOUUNTS:
            ResponseService.getDAppAccounts(request, sendResponse);
            break;
          case MessageTypes.BG_DAPP_SIGN_MESSAGE:
            ResponseService.signMessage(request, sender, sendResponse);
            break;
          case MessageTypes.WEB3_REQUEST:
            Web3ResponseService.web3Response(request, sender, sendResponse);
            break;
          default:
            ResponseService.handledAppDefault(request, sendResponse);
        }
      } catch (err) {
        // console.log('bg content err:', err);
        ResponseService.handleProcessingError(request, sendResponse);
      }
    }
  }
  // Don't remove return true.
  return true;
});
