import * as NodeActionTypes from '../constants/node';

export const updateNodeList = nodes => ({
  type: NodeActionTypes.UPDATE_NODE_LIST,
  nodes,
});
