import React, { Component } from 'react';
import TransactionItem from '../transaction-item';
import './styles.css';

export default class TransactionItems extends Component {
  render() {
    const { transactions, checkTransactionDetail, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        {transactions.map(transaction => (
          <div
            key={transaction.date}
            onClick={() => {
              checkTransactionDetail(transaction);
            }}
            style={{ cursor: 'pointer' }}
            className="transaction-item-wrapper"
          >
            <TransactionItem className="transaction-item" transaction={transaction} />
          </div>
        ))}
      </div>
    );
  }
}
