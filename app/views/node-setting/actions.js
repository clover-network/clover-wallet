import * as AccountApi from '../../api/account';
import { createToast } from '../../constants/toast';

export const submitNode = node => async dispatch => {
  try {
    await AccountApi.submitNode(node);
    dispatch(
      createToast({
        message: 'node added successfully.',
        type: 'success',
      }),
    );
  } catch (err) {
    dispatch(
      createToast({
        message: err.message,
        type: 'error',
      }),
    );
  }
};
