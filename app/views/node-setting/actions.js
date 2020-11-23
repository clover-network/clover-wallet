import { createToast } from '../../constants/toast';
import * as NodeAPI from '../../api/node';

export const submitNode = node => async dispatch => {
  try {
    await NodeAPI.submitNode(node);
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
