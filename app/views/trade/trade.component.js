import React, { Component } from 'react';
import { Find, IsEmpty } from 'react-lodash';
import './styles.css';
// import Transaction from '../../components/transaction/transaction';
import { QR_CODE_PAGE, TRANSFER_PAGE } from '../../constants/navigation';
import HeaderBack from '../../components/header-back';
import ButtonCustom from '../../components/common/buttons/button-custom';

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
    const { selectedToken, balance } = this.props;
    // const { selectedToken, balance, transactions } = this.props;
    return (
      <React.Fragment>
        <HeaderBack handleBack={this.handleBack} title={selectedToken} />
        <IsEmpty
          value={balance.tokens}
          yes={() => <React.Fragment />}
          no={() => (
            <React.Fragment>
              <div className="trade-amount-wrapper">
                <div className="trade-amount">
                  <Find
                    collection={balance.tokens}
                    predicate={token => token.token === selectedToken}
                  >
                    {token => token.amount}
                  </Find>
                </div>
                <span className="trade-conversion-value">≈$0</span>
              </div>
              <ul className="locked-available-retain-wrapper">
                <li>
                  <p>Locked</p>
                  <span>0</span>
                </li>
                <li>
                  <p>Available</p>
                  <span>
                    <Find
                      collection={balance.tokens}
                      predicate={token => token.token === selectedToken}
                    >
                      {token => token.amount}
                    </Find>
                  </span>
                </li>
                <li>
                  <p>Retain</p>
                  <span>0</span>
                </li>
              </ul>
              {/*<Transaction className="transaction-container" transactions={transactions} />*/}
              <div
                style={{
                  position: 'absolute',
                  bottom: '11px',
                  right: '20px',
                  left: '20px',
                  justifyContent: 'space-between',
                  display: 'flex',
                }}
              >
                <ButtonCustom
                  width="100px"
                  color="#41485D"
                  background="white"
                  border="1px solid rgba(65, 72, 93, 0.5);"
                >
                  SWAP
                </ButtonCustom>
                <ButtonCustom onClick={this.handleDeposit} width="100px">
                  RECEIVE
                </ButtonCustom>
                <ButtonCustom onClick={this.handleSend} width="100px">
                  SEND
                </ButtonCustom>
              </div>
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}
