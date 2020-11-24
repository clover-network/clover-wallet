import { getNodesState, updateNodes } from './store/node-store';
import * as status from '../../lib/constants/api';

// use below messages if no return message is needed
export const success = {
  status: status.SUCCESS,
  message: 'success',
};
// return a failure ...
export const failure = {
  status: status.FAILURE,
  message: 'failed',
};

export const duplicate = {
  status: status.DUPLICATE_ALIAS,
  message: 'duplicate node',
};

export const isNewNode = node => {
  const { addressBook } = getNodesState();
  const duplicateAddress = addressBook.find(x => x.address === node);
  if (duplicateAddress) {
    return { isNewAddress: false };
  }
  return { isNewAddress: true };
};

export const setNodes = nodes => {
  const result = updateNodes(nodes);
  return { result, ...success };
};

export const getNodes = () => {
  const { nodes } = getNodesState();
  return { nodes };
};
