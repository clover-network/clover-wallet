import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloverPassword from '../../components/common/password/clover-password';
import ContentHeader from '../../components/common/content-header';
import FooterButton from '../../components/common/footer-button';
import './styles.css';
import CloverInput from '../../components/common/clover-input';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isPasswordError: true,
      passwordError: '',
      // password repeat
      passwordRepeat: '',
      isPasswordRepeatError: true,
      passwordRepeatError: '',
      // wallet name
      walletName: '',
      wallNameError: '',
      isWalletNameError: true,
      // button status
      disabled: true,
    };
    this.walletNameInput = React.createRef();
  }

  componentDidMount() {
    this.walletNameInput.focus();
  }

  handleOnChange = prop => e => {
    const { value } = e.target;
    const {
      password,
      passwordRepeat,
      isWalletNameError,
      isPasswordError,
      isPasswordRepeatError,
    } = this.state;
    if (prop === 'walletName') {
      const isWalletNameErrorN = value.trim() === '';
      const valid = !isWalletNameErrorN && !isPasswordError && !isPasswordRepeatError;
      this.setState({
        [prop]: value,
        isWalletNameError: isWalletNameErrorN,
        wallNameError: isWalletNameErrorN ? 'Wallet name cannot be empty' : '',
        disabled: !valid,
      });
    } else if (prop === 'password') {
      const isPasswordErrorN = value.length < 8;
      const isPasswordRepeatErrorN = passwordRepeat !== value;
      const valid = !isWalletNameError && !isPasswordErrorN && !isPasswordRepeatErrorN;
      this.setState({
        [prop]: value,
        isPasswordError: isPasswordErrorN,
        passwordError: isPasswordErrorN ? 'Must be 8 characters or more in length.' : '',
        isPasswordRepeatError: isPasswordRepeatErrorN,
        passwordRepeatError:
          passwordRepeat && isPasswordRepeatErrorN ? 'Passwords are not the same.' : '',
        disabled: !valid,
      });
    } else {
      const isPasswordRepeatErrorN = password !== value;
      const valid = !isWalletNameError && !isPasswordError && !isPasswordRepeatErrorN;
      this.setState({
        [prop]: value,
        isPasswordRepeatError: isPasswordRepeatErrorN,
        passwordRepeatError: isPasswordRepeatErrorN ? 'Passwords are not the same.' : '',
        disabled: !valid,
      });
    }
  };

  handleClick = () => {
    const { signUp, setWalletName } = this.props;
    const { password, walletName } = this.state;
    setWalletName(walletName);
    signUp(password);
  };

  render() {
    const {
      isPasswordError,
      password,
      passwordError,

      passwordRepeat,
      isPasswordRepeatError,
      passwordRepeatError,

      walletName,
      isWalletNameError,
      wallNameError,
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
          onChange={this.handleOnChange('walletName')}
        />

        {isWalletNameError ? (
          <span className="error-msg">{wallNameError}</span>
        ) : (
          <span className="place-holder"> </span>
        )}

        <CloverPassword
          className="sign-up-password"
          onChange={e => this.handleOnChange('password', e)}
          password={password}
          placeholder="Password"
          handleClickShowPassword={this.handleClickShowPassword}
        />

        {isPasswordError ? (
          <span className="error-msg">{passwordError}</span>
        ) : (
          <span className="place-holder"> </span>
        )}

        <CloverInput
          className="sign-up-password"
          onChange={this.handleOnChange('passwordRepeat')}
          type="password"
          placeholder="Repeat Password"
          value={passwordRepeat}
        />

        {isPasswordRepeatError ? (
          <span className="error-msg">{passwordRepeatError}</span>
        ) : (
          <span className="place-holder"> </span>
        )}

        <FooterButton onClick={this.handleClick} disabled={this.state.disabled} name="next" />
      </div>
    );
  }
}

SignUp.defaultProps = {
  signUp: undefined,
  setWalletName: undefined,
};

SignUp.propTypes = {
  signUp: PropTypes.func,
  setWalletName: PropTypes.func,
};
