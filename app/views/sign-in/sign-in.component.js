import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import CloverPassword from '../../components/common/password/clover-password';
import FooterButton from '../../components/common/footer-button';
import Logo from '../../images/logo.svg';
import Error from '../../images/error.svg';
import './styles.css';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isError: false,
      disabled: true,
      label: 'Password',
      errorText: '',
    };
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      return { isError: true, errorText: props.error.message };
    }
    return state;
  }

  componentDidUpdate() {
    if (this.props.success) {
      this.props.onBoard();
    }
  }

  handleOnChange = prop => e => {
    const { value } = e.target;
    this.setState({
      [prop]: value,
      disabled: value === '',
    });
  };

  handleClick = () => {
    const { unlockClover } = this.props;
    const { password } = this.state;
    unlockClover(password);
  };

  render() {
    const {
      isError, password, label, errorText, disabled
    } = this.state;
    const CloverTooltip = withStyles(() => ({
      tooltip: {
        backgroundColor: '#41485D',
        color: 'white',
        maxWidth: 220,
        fontSize: '10px',
        padding: '10px 15px',
        lineHeight: '20px',
        fontFamily: 'Inter-Regular',
        marginTop: '5px',
      },
      arrow: {
        color: '#f5f5f9',
      },
    }))(Tooltip);
    return (
      <div>
        <div className="sign-in-container">
          <img src={Logo} alt="no-screen-shot" width="90" />
          <div className="title">Welcome Back</div>
          <CloverPassword
            className="sign-in-password-container"
            onChange={this.handleOnChange}
            isError={isError}
            password={password}
            placeholder="Password"
            label={label}
          />
          <div className="msg-container">
            <div className={isError ? 'error-msg' : 'hidden'}>
              <img src={Error} alt="error" width="14" />
              <span>{errorText}</span>
            </div>
            <CloverTooltip
              title="If you lose your password, please reinstall the plug-in and import your wallet private key again"
              placement="bottom-end"
            >
              <span className="forgot">Forgot password?</span>
            </CloverTooltip>
          </div>
          <FooterButton onClick={this.handleClick} disabled={disabled} name="unlock" />
        </div>
      </div>
    );
  }
}

SignIn.defaultProps = {
  unlockClover: undefined,
};

SignIn.propTypes = {
  unlockClover: PropTypes.func,
};
