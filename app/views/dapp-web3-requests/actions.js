import { cancelWeb3Request } from '../../api/dapp';
import * as DAppService from '../../services/dapp-service';
import { onBoard } from '../../actions/initialize';
import { setNetwork } from '../../actions/network';

export const cancelDAppRequest = request => async dispatch => {
  await cancelWeb3Request(request);
  dispatch(onBoard());
};

export const allowRequest = request => async dispatch => {
  if (request.request.opts.method === 'eth_sendTransaction') {
    await DAppService.signWeb3Message(request);
    // case RequestType.SEND:
    //   await DAppService.submitTransaction(request);
    //   break;
    // case RequestType.SIGN_MESSAGE:
    //   await DAppService.signMessage(request);
    //   break;
    // default:
  }
  dispatch(onBoard());
};

export const fetchNetwork = () => async dispatch => {
  await dispatch(setNetwork);
};
