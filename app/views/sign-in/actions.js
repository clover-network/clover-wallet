import { keccak512 } from 'js-sha3';
import * as APITypes from '../../api';
import * as SignInActionTypes from './action-types';
import * as APIConstants from '../../../lib/constants/api';
import { updateAppLoading } from '../../containers/actions';

const unlockCloverSuccess = () => ({
  type: SignInActionTypes.UNLOCK_CLOVER_SUCCESS,
});

const unlockCloverError = error => ({
  type: SignInActionTypes.UNLOCK_CLOVER_ERROR,
  error,
});

export const unlockClover = password => async dispatch => {
  try {
    dispatch(updateAppLoading(true));
    await APITypes.OnBoarding.setHashKey(keccak512(password));
    dispatch(unlockCloverSuccess());
  } catch (e) {
    dispatch(updateAppLoading(false));
    const error = {
      message: e.message,
      stack: e.stack || {},
    };
    switch (e.code) {
      case APIConstants.FAILURE:
        error.message = password !== '' ? 'Password is incorrect.' : 'Password is required.';
        break;
      default:
    }
    dispatch(unlockCloverError(error));
  }
};
