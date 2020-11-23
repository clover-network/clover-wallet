import { createToast } from '../../constants/toast';
import * as NodeAPI from '../../api/node';
import { updateNodeList } from '../../actions/node';

export const getNodes = () => async dispatch => {
  try {
    const {
      result: { nodes },
    } = await NodeAPI.getNodes();
    dispatch(updateNodeList(nodes));
  } catch (e) {
    dispatch(createToast({ message: 'Error getting nodes', type: 'error' }));
  }
};
