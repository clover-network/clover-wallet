import React, { Component } from 'react';
import SendIcon from '../../../images/send.svg';
import TransactionItemDetails from '../transaction-item-details';
import { DAPP } from '../../../../lib/constants/transaction';
import './styles.css';

export default class TransactionItem extends Component {
  render() {
    const { transaction, ...otherProps } = this.props;
    const {
      internal: {
        network: { transactionUrl },
      },
    } = transaction;
    return (
      <div>
        {transactionUrl && transaction.status !== DAPP ? (
          <a
            href={`${transactionUrl}/${transaction.txnHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div {...otherProps}>
              <img src={SendIcon} className="transfer-item-icon" alt="send" width="35" />
              <TransactionItemDetails
                amount={transaction.transferAmount}
                address={transaction.metadata.to}
                moment={transaction.modifiedDate}
                status={transaction.status}
                color={transaction.color}
              />
            </div>
          </a>
        ) : (
          <div {...otherProps}>
            <img src={SendIcon} className="transfer-item-icon" alt="send" width="35" />
            <TransactionItemDetails
              amount={transaction.transferAmount}
              address={transaction.metadata.to}
              moment={transaction.modifiedDate}
              status={transaction.status}
              color={transaction.color}
            />
          </div>
        )}
      </div>
    );
  }
}
