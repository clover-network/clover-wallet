import { keccak512 } from 'js-sha3';
import * as SignUpActionTypes from './action-types';
import * as APITypes from '../../api';
import * as AppActions from '../../containers/actions';
import * as AccountActions from '../../actions/account';
import * as NavConstants from '../../constants/navigation';

const setHashKeySuccess = () => ({
  type: SignUpActionTypes.SET_HASH_KEY_SUCCESS,
});

const updateWalletName = name => ({
  type: SignUpActionTypes.UPDATE_WALLET_NAME,
  name,
});

export const signUp = password => async dispatch => {
  dispatch(AppActions.updateAppLoading(true));
  await APITypes.OnBoarding.setHashKey(keccak512(password));
  dispatch(setHashKeySuccess());
  await dispatch(AccountActions.getSeedWords());
  dispatch(AppActions.changePage(NavConstants.CREATE_ACCOUNT_PAGE));
  dispatch(AppActions.updateAppLoading(false));
};

export const setWalletName = name => async dispatch => {
  dispatch(updateWalletName(name));
};
