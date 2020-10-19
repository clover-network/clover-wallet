import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloverPassword from '../../components/common/password/clover-password';
import ContentHeader from '../../components/common/content-header';
import FooterButton from '../../components/common/footer-button';
import './styles.css';
import CloverInput from '../../components/common/clover-input';

const errorMessage = 'Must be 8 characters or more in length.';
const requiredErrorMessage = 'Password required';
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isError: false,
      errorText: '',
      passwordRepeat: '',
      isRepeatError: false,
      errorTextRepeat: '',
      walletName: '',
      isWalletNameError: false,
    };
    this.walletNameInput = React.createRef();
    this.passwordInput = React.createRef();
    this.passwordRepeatInput = React.createRef();
  }

  componentDidMount() {
    this.walletNameInput.focus();
  }

  handleOnNameChange = prop => e => {
    const { value } = e.target;
    this.setState({
      [prop]: value,
      isWalletNameError: false,
    });
  };

  handleOnChange = prop => e => {
    const { value } = e.target;
    const { password } = this.state;
    let { isError } = this.state;

    this.props.setPasswordMeterScore(value);

    if (isError && password && password.length >= 8) {
      isError = false;
    }
    this.setState({
      [prop]: value,
      isError,
    });
  };

  handleOnNameBlur = () => {
    const { walletName } = this.state;
    let { isWalletNameError } = this.state;
    isWalletNameError = walletName.trim() === '';
    this.setState({
      isWalletNameError,
    });
  };

  handleOnBlur = () => {
    const { password } = this.state;
    let { errorText } = this.state;
    let isError = false;
    if (password && password.length < 8) {
      isError = true;
      errorText = errorMessage;
    }
    this.setState({ isError, errorText });
  };

  handleOnRepeatBlur = () => {
    const { password, passwordRepeat } = this.state;
    let { errorTextRepeat } = this.state;
    let isRepeatError = false;
    if (passwordRepeat !== password) {
      isRepeatError = true;
      errorTextRepeat = 'Password and repeat are not same.';
    }
    this.setState({ isRepeatError, errorTextRepeat });
  };

  handleOnRepeatChange = prop => e => {
    const { value } = e.target;
    const isRepeatError = false;
    this.setState({
      [prop]: value,
      isRepeatError,
    });
  };

  handleClick = () => {
    const { signUp } = this.props;
    const { password, type } = this.state;
    let { errorText } = this.state;
    let isError = false;
    if (password.length === 0) {
      isError = true;
      errorText = requiredErrorMessage;
    } else if (password.length < 8) {
      isError = true;
      errorText = errorMessage;
    } else {
      signUp(password, type);
    }
    this.setState({ isError, errorText });
  };

  render() {
    const {
      isError,
      password,
      passwordRepeat,
      errorText,
      isRepeatError,
      errorTextRepeat,
      walletName,
      isWalletNameError,
    } = this.state;
    return (
      <div className="sign-up-container">
        <ContentHeader
          className="sign-up-content-header"
          title="Create A Password To Secure Your Account"
          description="The password is used to protect your Enigma seed phrase(s) so that other Chrome extensions can't access them."
        />

        <CloverInput
          className="sign-up-password wallet-name-margin"
          type="text"
          labelWidth={0}
          placeholder="Wallet Name"
          value={walletName}
          inputRef={input => {
            this.walletNameInput = input;
          }}
          onChange={this.handleOnNameChange('walletName')}
          onBlur={this.handleOnNameBlur}
        />

        {isWalletNameError ? (
          <span className="error-msg">Wallet name cannot be empty</span>
        ) : (
          <span className="place-holder"> </span>
        )}

        <CloverPassword
          className="sign-up-password"
          onChange={this.handleOnChange}
          isError={isError}
          onBlur={this.handleOnBlur}
          inputRef={input => {
            this.passwordInput = input;
          }}
          password={password}
          errorMessage={isError ? errorText : null}
          placeholder="Password"
          handleClickShowPassword={this.handleClickShowPassword}
        />

        <CloverInput
          className="sign-up-password input-margin"
          onChange={this.handleOnRepeatChange('passwordRepeat')}
          type="password"
          placeholder="Repeat Password"
          value={passwordRepeat}
          inputRef={input => {
            this.passwordRepeatInput = input;
          }}
          helperText={isRepeatError ? errorTextRepeat : null}
        />

        <FooterButton onClick={this.handleClick} name="next" />
      </div>
    );
  }
}

SignUp.defaultProps = {
  signUp: undefined,
  setPasswordMeterScore: undefined,
};

SignUp.propTypes = {
  signUp: PropTypes.func,
  setPasswordMeterScore: PropTypes.func,
};
