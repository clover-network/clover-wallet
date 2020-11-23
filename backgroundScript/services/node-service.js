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

export const validateNode = contact => {
  const { addressBook } = getNodesState();
  if (addressBook.length > 0) {
    const duplicateAddress = addressBook.find(x => x.address === contact.address);
    if (duplicateAddress) {
      throw new Error('Duplicate Address');
    }
    const duplicateName = addressBook.find(
      x => x.fname === contact.fname.trim() && x.lname === contact.lname.trim(),
    );
    if (duplicateName) {
      throw new Error('Duplicate name');
    }
  }
};

export const submitNode = node => {
  validateNode(node);
  const { addressBook } = getNodesState();
  const newAddreesBook = [...addressBook, { ...node }];
  const result = updateNodes(newAddreesBook);
  return { result, ...success };
};

export const getNodes = () => {
  const { nodes } = getNodesState();
  return { nodes };
};

export const removeNode = async node => {
  // get previous nodes
  const { address, fname } = node;
  const { addressBook } = getNodesState();
  const filteredAddressBook = addressBook.filter(x => x.address !== address || x.fname !== fname);

  // update reducer state
  await updateNodes(filteredAddressBook);

  return true;
};
