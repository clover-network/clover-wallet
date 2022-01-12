import React, { Component } from "react";
import { Find, IsEmpty } from "react-lodash";
import "./styles.css";
import Transaction from "../../components/transaction/transaction";
import {
  DASHBOARD_PAGE,
  QR_CODE_PAGE,
  TRANSFER_PAGE,
  TRANSFER_STATUS_PAGE,
} from "../../constants/navigation";
import HeaderBack from "../../components/header-back";
import ButtonCustom from "../../components/common/buttons/button-custom";
import LogoIcon from '../../images/logo.png';


export default class Trade extends Component {
  handleBack = () => {
    this.props.changePage(DASHBOARD_PAGE);
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

  checkTransactionDetail = (selectTransaction) => {
    this.props.updateSelectedTransaction(selectTransaction);
    this.props.changePage(TRANSFER_STATUS_PAGE);
  };

  render() {
    const { selectedToken, balance, transactions } = this.props;
    return (
      <React.Fragment>
        <HeaderBack handleBack={this.handleBack} title={selectedToken} />
        <IsEmpty
          value={balance.tokens}
          yes={() => <React.Fragment />}
          no={() => (
            <React.Fragment>
              <div className="trade-amount-wrapper">
              <img width="36" height="36" src={LogoIcon} alt="" />
                <div className="trade-amount">
                  <Find
                    collection={balance.tokens}
                    predicate={(token) => token.token === selectedToken}
                  >
                    {(token) => token.taoTotal}
                  </Find>
                </div>
                {/* <span className="trade-conversion-value">≈$0</span> */}
              </div>
              <ul className="locked-available-retain-wrapper">
                <li>
                  <p>Reserved</p>
                  <span>
                    <Find
                      collection={balance.tokens}
                      predicate={(token) => token.token === selectedToken}
                    >
                      {(token) => token.reserved}
                    </Find>
                  </span>
                </li>
                <li>
                  <p>Free</p>
                  <span>
                    <Find
                      collection={balance.tokens}
                      predicate={(token) => token.token === selectedToken}
                    >
                      {(token) => token.amount}
                    </Find>
                  </span>
                </li>
                <li>
                  <p>Retain</p>
                  <span>0</span>
                </li>
              </ul>
              <Transaction
                className="transaction-container"
                checkTransactionDetail={this.checkTransactionDetail}
                transactions={transactions.filter(
                  (t) => t.metadata.token === selectedToken
                )}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  left: "20px",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <ButtonCustom
                  onClick={this.handleDeposit}
                  width="150px !important"
                  height="48px !important"
                  border="1px solid #F23E5F"
                  className="button-sm-primary"
                >
                  RECEIVE
                </ButtonCustom>
                <ButtonCustom
                  onClick={this.handleSend}
                  width="150px !important"
                  height="48px !important"
                  color="#fff !important"
                  background="#F23E5F !important"
                  className="button-sm-primary"
                >
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
