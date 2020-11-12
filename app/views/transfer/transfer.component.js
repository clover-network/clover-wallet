import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import _ from 'lodash';
import InputBase from '@material-ui/core/InputBase';
import * as NavConstants from '../../constants/navigation';
import ArrowLeft from '../../images/arrow_left.svg';
import HeaderBack from '../../components/header-back';
import './styles.css';
import MailList from '../../images/mail_list.svg';
import FooterButton from '../../components/common/footer-button';
import SelectAssets from '../../components/select-assets';
import { getCurrencyIcon } from '../../utils/dashboard';
import SelectDown from '../../images/select_down_icon.svg';
import ButtonMD from '../../components/common/buttons/button-md';
import AddressList from '../../components/address-book/address-list';
import EmptyDashboard from '../../components/empty-dashboard';

export default class Transfer extends Component {
  constructor(props) {
    super(props);
    const {
      confirmDetails: { metadata },
      balance,
      selectedToken,
    } = props;
    //TODO DP: Can be improved by using optional chaining operator
    this.state = {
      to: metadata ? metadata.to : '',
      amount: metadata ? metadata.amount : '',
      unit: metadata ? metadata.unit : '',
      buttonText: 'next',
      isAmountError: false,
      currentToken: balance.tokens ? _.find(balance.tokens, t => t.token === selectedToken) : '',
      showCurrencySelect: false,
      showAddressSelect: false,
    };
    this.toInput = React.createRef();
    this.amountInput = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.unit === '') {
      return { unit: props.unit };
    }
    return state;
  }

  componentDidMount() {
    this.props.dispatchSetTransferDetails({
      metadata: {
        ...this.props.confirmDetails.metadata,
        account: this.props.account,
        unit: this.state.unit,
      },
    });
  }

  componentDidUpdate(props) {
    if (props.units === null) {
      this.props.updateAppLoading(true);
    }
    if (props.success) {
      this.props.updateAppLoading(false);
      this.props.changePage(NavConstants.CONFIRM_PAGE);
    }
    if (props.error && props.error.isError) {
      if (props.isToAddressError) {
        this.toInput.focus();
      } else {
        this.amountInput.focus();
      }
    }
  }

  handleSubheaderBackBtn = () => {
    this.props.resetConfirmOnBoarding();
    this.props.clearTransferDetails();
    this.props.changePage(NavConstants.DASHBOARD_PAGE);
  };

  handleToChange = prop => e => {
    this.props.dispatchSetTransferDetails({
      metadata: {
        ...this.props.confirmDetails.metadata,
        to: e.target.value,
      },
    });
    this.setState({
      [prop]: e.target.value,
    });
    this.props.updateToAddress(e.target.value);
  };

  handleAmountChange = prop => e => {
    const totalAmount = _.find(this.props.balance.tokens, t => t.token === this.props.selectedToken)
      .amount;
    this.props.dispatchSetTransferDetails({
      metadata: {
        ...this.props.confirmDetails.metadata,
        amount: e.target.value,
      },
    });
    this.setState({ [prop]: e.target.value, isAmountError: false });
    if (_.toNumber(e.target.value) > _.toNumber(totalAmount)) {
      this.setState({ isAmountError: true });
    }
  };

  onAddressBookClick = () => {
    this.props.updateBackupPage(this.props.page);
    this.props.changePage(NavConstants.ADDRESS_BOOK_PAGE);
  };

  getMaxAmount = () => {
    const totalAmount = _.find(this.props.balance.tokens, t => t.token === this.props.selectedToken)
      .amount;
    if (totalAmount !== '') {
      this.props.dispatchSetTransferDetails({
        metadata: {
          ...this.props.confirmDetails.metadata,
          amount: totalAmount,
        },
      });
      this.setState({ amount: totalAmount });
    }
  };

  handleSendButton = () => {
    const { amount, unit } = this.state;
    const { toAddress, selectedToken } = this.props;
    if (toAddress !== '' && amount !== '') {
      this.props.confirmTransaction(toAddress, this.props.account, amount, unit, selectedToken);
    } else if (toAddress === '') {
      this.toInput.focus();
    } else {
      this.amountInput.focus();
    }
  };

  handleUnitChange = e => {
    const unit = this.props.units.find(u => u.value === e.target.value);
    this.props.dispatchSetTransferDetails({
      metadata: {
        ...this.props.confirmDetails.metadata,
        unit,
      },
    });
    this.setState({ unit });
  };

  handleCurrencyChange = token => () => {
    this.props.selectToken(token.token);
    this.setState({ currentToken: token });
  };

  toggleAddress = status => () => {
    this.setState({ showAddressSelect: status });
  };

  toggleDrawer = status => () => {
    this.setState({ showCurrencySelect: status });
  };

  render() {
    const {
      isToAddressError, toAddress, balance, addressBook
    } = this.props;
    const {
      to,
      amount,
      buttonText,
      currentToken,
      showCurrencySelect,
      showAddressSelect,
    } = this.state;
    return (
      <div>
        <HeaderBack icon={ArrowLeft} handleBack={this.handleSubheaderBackBtn} title="SEND" />
        <div className="transfer-form-card">
          <div className="transfer-border-bottom transfer-padding">
            <span className="transfer-card-span">To</span>
            <InputBase
              style={{ fontSize: '12px' }}
              fullWidth
              error={isToAddressError}
              placeholder="Input or paste address here"
              value={toAddress || to}
              name="to"
              onChange={this.handleToChange('to')}
              inputRef={input => {
                this.toInput = input;
              }}
              endAdornment={(
                <div className="address-book-icon">
                  {/*<div onClick={addressBook.length === 0 ? '' : this.toggleAddress(true)}>*/}
                  <div onClick={this.onAddressBookClick}>
                    <img width="20" height="20" src={MailList} alt="" />
                  </div>
                  <React.Fragment>
                    <Drawer
                      anchor="bottom"
                      open={showAddressSelect}
                      onClose={this.toggleAddress(false)}
                    >
                      <div
                        className="select-asset-wrapper"
                        onClick={this.toggleAddress(false)}
                        onKeyDown={this.toggleAddress(false)}
                      >
                        <div className="select-asset-title">Send to Address</div>
                        <List>
                          {addressBook.length > 0 ? (
                            <AddressList
                              className="address-book-container"
                              addressBook={addressBook}
                            />
                          ) : (
                            <EmptyDashboard
                              className="empty-list-text"
                              text="Click here to add an address!"
                            />
                          )}
                          {addressBook.length === 0 ? (
                            <div className="address-book-add-button">
                              <ButtonMD color="dashboard" onClick={this.handleAddAddressClick}>
                                Add Address
                              </ButtonMD>
                            </div>
                          ) : null}
                        </List>
                      </div>
                    </Drawer>
                  </React.Fragment>
                </div>
              )}
            />
          </div>
          <div className="transfer-border-bottom transfer-padding-top">
            <span className="transfer-card-span">Asset</span>
            <div className="transfer-asset">
              <div className="transfer-select-asset-item-wrapper" onClick={this.toggleDrawer(true)}>
                <div className="transfer-select-asset-item-left">
                  <img
                    className="transfer-select-asset-item-icon"
                    width="26"
                    height="26"
                    src={getCurrencyIcon(currentToken.token)}
                    alt=""
                  />
                  <span className="transfer-select-asset-item-currency-type">
                    {currentToken.token}
                  </span>
                </div>
                <span className="transfer-select-asset-item-amount">{`${currentToken.amount} ${currentToken.token}`}</span>
                <img
                  className="transfer-select-down-icon"
                  width="9"
                  height="6"
                  src={SelectDown}
                  alt=""
                />
              </div>
              <SelectAssets
                assetsList={balance.tokens}
                handleCurrencyChange={this.handleCurrencyChange}
                toggleDrawer={this.toggleDrawer}
                showCurrencySelect={showCurrencySelect}
              />
            </div>
          </div>
          <div className="transfer-padding">
            <span className="transfer-card-span">Amount</span>
            <InputBase
              style={{ fontSize: '12px' }}
              fullWidth
              error={this.state.isAmountError}
              placeholder="Input amount here"
              value={amount}
              name="amount"
              onChange={this.handleAmountChange('amount')}
              inputRef={input => {
                this.amountInput = input;
              }}
              endAdornment={(
                <div className="transfer-amount-max" onClick={this.getMaxAmount}>
                  MAX
                </div>
              )}
            />
            <span
              className={`insufficient-balance ${
                this.state.isAmountError ? 'show-insufficient-balance' : ''
              }`}
            >
              Insufficient balance
            </span>
          </div>
          <FooterButton
            disabled={this.state.isAmountError || !this.state.amount || !this.state.to}
            style={{ left: 0 }}
            onClick={this.handleSendButton}
            name={buttonText}
          />
        </div>
      </div>
    );
  }
}

Transfer.defaultProps = {
  changePage: undefined,
  account: undefined,
};

Transfer.propTypes = {
  changePage: PropTypes.func,
  account: PropTypes.object,
};
