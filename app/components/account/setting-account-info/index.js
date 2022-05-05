import React, { Component } from "react";
import "./styles.css";
import { shortenAddress } from "../../../services/wallet-service";

export default class SettingAccountDetails extends Component {
  render() {
    const { alias, address, ...otherProps } = this.props;
    return (
      <div className="account-info-wrapper" {...otherProps}>
        <span className="account-info-alias">{alias}</span>
        <span className="account-info-address">{shortenAddress(address)}</span>
        <div className="account-connect-status">
          <span>Connected</span>
        </div>
      </div>
    );
  }
}
