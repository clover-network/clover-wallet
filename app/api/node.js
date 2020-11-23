import * as MessageTypes from '../../lib/constants/message-types';
import { sendMessage } from '../../lib/services/extension/messages';
import { throwIfNoSuccess } from './helper';

export const submitNode = async node => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_NODE_ADD,
    node,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const getNodes = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_NODE_LIST,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};
