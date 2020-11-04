import React, { Component } from 'react';
import { Find, IsEmpty } from 'react-lodash';
import Button from '@material-ui/core/Button';
import './styles.css';
import Transaction from '../../components/transaction/transaction';
import { QR_CODE_PAGE, TRANSFER_PAGE } from '../../constants/navigation';

export default class Trade extends Component {
  handleBack = () => {
    this.props.changePage(this.props.backupPage);
  };

  handleSend = () => {
    if (!this.props.isConnected) {
      this.props.connectionError();
    } else {
      this.props.getUnits();
      this.props.resetToAddress();
      this.props.changePage(TRANSFER_PAGE);
    }
  };

  handleDeposit = () => {
    this.props.changePage(QR_CODE_PAGE);
  };

  render() {
    const { selectedToken, balance, transactions } = this.props;
    return (
      <React.Fragment>
        <div>{selectedToken}</div>
        <IsEmpty
          value={balance.tokens}
          yes={() => <React.Fragment />}
          no={() => (
            <React.Fragment>
              <Find collection={balance.tokens} predicate={token => token.token === selectedToken}>
                {token => token.balanceFormatted}
              </Find>
              <Transaction className="transaction-container" transactions={transactions} />
              <Button>SWAP</Button>
              <Button onClick={this.handleDeposit}>RECEIVE</Button>
              <Button onClick={this.handleSend}>SEND</Button>
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}
