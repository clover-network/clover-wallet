export const UPDATE_NODE_LIST = 'NODE/UPDATE_LIST';

export function updateNodeList(nodes) {
  return {
    type: UPDATE_NODE_LIST,
    payload: nodes,
  };
}
