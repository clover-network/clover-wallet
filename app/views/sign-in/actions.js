import { keccak512 } from "js-sha3";
import * as APITypes from "../../api";
import * as SignInActionTypes from "./action-types";
import * as APIConstants from "../../../lib/constants/api";
import { updateAppLoading } from "../../containers/actions";

const unlockWalletSuccess = () => ({
  type: SignInActionTypes.UNLOCK_WALLET_SUCCESS,
});

const unlockWalletError = (error) => ({
  type: SignInActionTypes.UNLOCK_WALLET_ERROR,
  error,
});

export const unlockWallet = (password) => async (dispatch) => {
  try {
    dispatch(updateAppLoading(true));
    await APITypes.OnBoarding.setHashKey(keccak512(password));
    dispatch(unlockWalletSuccess());
  } catch (e) {
    dispatch(updateAppLoading(false));
    const error = {
      message: e.message,
      stack: e.stack || {},
    };
    switch (e.code) {
      case APIConstants.FAILURE:
        error.message =
          password !== "" ? "Incorrect password" : "Password is required";
        break;
      default:
    }
    dispatch(unlockWalletError(error));
  }
};
