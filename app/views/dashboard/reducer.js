import * as Types from './action-types';
import { ACCOUNT_MENU_OPTIONS } from '../../constants/options';

const initialState = {
  accountMenu: ACCOUNT_MENU_OPTIONS,
  transactions: [],
  pendingTransfers: [],
  selectedTransaction: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_TRANSACTION_LIST:
      return {
        ...state,
        ...{
          transactions: action.transactions,
        },
      };
    case Types.SELECT_TRANSACTION:
      return {
        ...state,
        ...{
          selectedTransaction: action.selectedTransaction,
        },
      };
    case Types.UPDATE_PENDING_TRANSACTION_LIST:
      return {
        ...state,
        ...{
          pendingTransfers: action.pendingTransfers,
        },
      };
    default:
      return state;
  }
};

export default reducer;
