import { getStore } from '../../store/store-provider';
import { updateNodeList } from '../../actions/nodes';

export const getNodesState = () => {
  const { nodeState } = getStore().getState();
  return { ...nodeState };
};

export const updateNodes = nodes => getStore().dispatch(updateNodeList(nodes));
