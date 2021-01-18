import { FETCH_TRANSACTION, FETCH_TRANSACTIONS, FETCH_WEB3_TRANSACTIONS } from '../actions/transactions';

const initialState = {
  transaction: undefined,
  transactionArr: [],
  web3TransactionArr: []
};
const transactionState = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
      };
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        transactionArr: action.payload,
      };
    case FETCH_WEB3_TRANSACTIONS:
      return {
        ...state,
        web3TransactionArr: action.payload,
      }
    default:
      return state;
  }
};
export default transactionState;
