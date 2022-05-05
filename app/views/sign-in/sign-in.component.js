import React, { Component } from "react";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";
import FusoPassword from "../../components/common/password/fuso-password";
import FooterButton from "../../components/common/footer-button";
import Logo from "../../images/logo.png";
import Error from "../../images/error.svg";
import "./styles.css";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      isError: false,
      disabled: true,
      label: "Password",
      errorText: "",
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

  handleOnChange = (prop) => (e) => {
    const { value } = e.target;
    this.setState({
      [prop]: value,
      disabled: value === "",
    });
  };

  handleOnEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  };

  handleClick = () => {
    const { unlockWallet } = this.props;
    const { password } = this.state;
    unlockWallet(password);
  };

  render() {
    const { isError, password, label, errorText, disabled } = this.state;
    const FusoTooltip = withStyles(() => ({
      tooltip: {
        backgroundColor: "primary",
        color: "white",
        maxWidth: 220,
        fontSize: "10px",
        padding: "10px 15px",
        lineHeight: "20px",
        fontFamily: "Inter-Regular",
        marginTop: "5px",
      },
    }))(Tooltip);
    return (
      <div>
        <div className="sign-in-container">
          <img src={Logo} alt="no-screen-shot" width="90" />
          <div className="title">Welcome Back</div>
          <FusoPassword
            className="sign-in-password-container"
            onChange={this.handleOnChange}
            isError={isError}
            password={password}
            placeholder="Password"
            onKeyPress={this.handleOnEnterKeyPress}
          />
          <div className="msg-container">
            <div className={isError ? "error-msg" : "hidden"}>
              <img src={Error} alt="error" width="14" />
              <span>{errorText}</span>
            </div>
            <FusoTooltip
              title="If you lose your password, please reinstall the plug-in and import your wallet private key again"
              placement="bottom-end"
            >
              <span className="forgot">Forgot password?</span>
            </FusoTooltip>
          </div>
          <FooterButton
            onClick={this.handleClick}
            disabled={disabled}
            name="unlock"
          />
        </div>
      </div>
    );
  }
}

SignIn.defaultProps = {
  unlockWallet: undefined,
};

SignIn.propTypes = {
  unlockWallet: PropTypes.func,
};
