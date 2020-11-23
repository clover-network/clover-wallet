import { createToast } from '../../constants/toast';
import * as NodeAPI from '../../api/node';
import { updateNodeList } from '../../actions/node';

export const updateNodes = nodes => async dispatch => {
  try {
    await NodeAPI.updateNodes(nodes);
    dispatch(updateNodeList(nodes));
    dispatch(
      createToast({
        message: 'node updated successfully.',
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
