import { UPDATE_NODE_LIST } from '../actions/nodes';
import { CLOVER_NODES } from '../../lib/constants/nodes';

const initialState = {
  // array of node object
  nodes: [CLOVER_NODES],
};

const nodeState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NODE_LIST:
      return {
        ...state,
        nodes: action.payload,
      };
    default:
      return state;
  }
};

export default nodeState;
