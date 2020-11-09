import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import _ from 'lodash';
import InputBase from '@material-ui/core/InputBase';
import { getCurrencyIcon } from '../../utils/dashboard';
import * as NavConstants from '../../constants/navigation';
import ArrowLeft from '../../images/arrow_left.svg';
import HeaderBack from '../../components/header-back';
import './styles.css';
import MailList from '../../images/mail_list.svg';
import FooterButton from '../../components/common/footer-button';

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

  handleCurrencyChange = e => {
    const token = _.find(this.props.balance.tokens, t => t.amount === e.target.value);
    this.props.selectToken(token.token);
    this.setState({ currentToken: token });
  };

  render() {
    const { isToAddressError, toAddress, balance } = this.props;
    const {
      to, amount, buttonText, currentToken
    } = this.state;
    const BootstrapInput = withStyles(() => ({}))(InputBase);
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
                <div className="address-book-icon" onClick={this.onAddressBookClick}>
                  <img width="20" height="20" src={MailList} alt="" />
                </div>
              )}
            />
          </div>
          <div className="transfer-border-bottom transfer-padding-top">
            <span className="transfer-card-span">Asset</span>
            <div className="transfer-asset">
              <Select
                value={currentToken.amount}
                onChange={this.handleCurrencyChange}
                input={<BootstrapInput />}
              >
                {balance.tokens.map(token => (
                  <MenuItem key={token.amount} value={token.amount}>
                    <div className="transfer-select-item-left">
                      <img
                        className="transfer-select-item-icon"
                        width="26"
                        height="26"
                        src={getCurrencyIcon(token.token)}
                        alt=""
                      />
                      <span className="transfer-select-item-currency-type">{token.token}</span>
                    </div>
                    <span className="transfer-select-item-amount">{`${token.amount} ${token.token}`}</span>
                  </MenuItem>
                ))}
              </Select>
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
