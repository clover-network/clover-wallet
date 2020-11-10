import React, { Component } from 'react';
import './styles.css';
import HeaderBack from '../../components/header-back';
import { TRADE_PAGE } from '../../constants/navigation';
import TransferFinished from '../../images/transfer_finished.svg';
import TransferPending from '../../images/transfer_pending.svg';
import TransferFailed from '../../images/transfer_failed.svg';
import DarkDivider from '../../components/common/divider/dark-divider';

export default class TransferStatus extends Component {
  handleBack = () => {
    this.props.changePage(TRADE_PAGE);
  };

  getTransferStatusIcon = type => {
    if (type === 'Finished') {
      return TransferFinished;
    }
    if (type === 'Pending') {
      return TransferPending;
    }
    if (type === 'Failed') {
      return TransferFailed;
    }
  };

  getTransferStatusClassName = type => {
    if (type === 'Finished') {
      return 'transfer-finished-color';
    }
    if (type === 'Pending') {
      return 'transfer-pending-color';
    }
    if (type === 'Failed') {
      return 'transfer-failed-color';
    }
  };

  render() {
    const { selectedToken, selectedTransaction } = this.props;
    return (
      <div className="container">
        <HeaderBack
          handleBack={this.handleBack}
          title={selectedToken}
          style={{ textAlign: 'left', marginLeft: '20px' }}
        />
        <div className="transfer-status-wrapper">
          <img
            width="40"
            height="40"
            src={this.getTransferStatusIcon(selectedTransaction.status)}
            alt=""
          />
          <div
            className={`transfer-status ${this.getTransferStatusClassName(
              selectedTransaction.status,
            )}`}
          >
            {selectedTransaction.status}
          </div>
          <span>{selectedTransaction.date}</span>
        </div>
        <div className="transfer-Detail-wrapper">
          <div className="transfer-detail-item transfer-detail-amount">
            <span>Amount</span>
            <div>{selectedTransaction.metadata.transferAmount}</div>
          </div>
          <div className="transfer-detail-item">
            <span>To</span>
            <div>{selectedTransaction.metadata.to}</div>
          </div>
          <div className="transfer-detail-item">
            <span>From</span>
            <div>{selectedTransaction.metadata.account.address}</div>
          </div>
          <div className="transfer-detail-item">
            <span>Fee</span>
            <div>{selectedTransaction.metadata.transferFee}</div>
          </div>
          <div className="transfer-detail-item transfer-detail-hash">
            <span>Hash</span>
            <div>{selectedTransaction.txnHash}</div>
          </div>
        </div>
        <DarkDivider />
        <div className="footer">
          <a className="transfer-on-subscan" href="#">
            View this transfer on subscan
          </a>
        </div>
      </div>
    );
  }
}
