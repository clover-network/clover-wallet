import * as Types from '../constants/node';

const initialState = {
  nodes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_NODE_LIST:
      return {
        ...state,
        nodes: action.nodes,
      };
    default:
      return state;
  }
};

export default reducer;
