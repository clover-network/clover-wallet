import React, { Component } from 'react';
import './styles.css';
import Close from '../../images/close.svg';
import { shortenAddress } from '../../services/wallet-service';

export default class Settings extends Component {
  handleClose = () => {
    this.props.changePage(this.props.backupPage);
  };

  render() {
    const { account } = this.props;
    return (
      <div className="container">
        <span>{account.alias}</span>
        <span>{shortenAddress(account.address)}</span>
        <div className="footer" onClick={this.handleClose}>
          <img src={Close} alt="close" aria-hidden="true" width="20" />
          <span className="close">CLOSE</span>
        </div>
      </div>
    );
  }
}
