export const FETCH_TRANSACTION = 'TX/FETCH_TRANSACTION';
export const FETCH_TRANSACTIONS = 'TX/FETCH_TRANSACTIONS';
export const FETCH_WEB3_TRANSACTIONS = 'TX/FETCH_WEB3_TRANSACTIONS'

export function fetchTransaction(transaction) {
  return {
    type: FETCH_TRANSACTION,
    payload: transaction,
  };
}

export function fetchTransactions(transactions) {
  return {
    type: FETCH_TRANSACTIONS,
    payload: transactions,
  };
}

export function fetchWeb3Transactions(transactions) {
  return {
    type: FETCH_WEB3_TRANSACTIONS,
    payload: transactions,
  };
}