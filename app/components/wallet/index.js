import React, { Component } from 'react';
import AccountPanel from '../account/account-panel';
import './styles.css';

export default class Wallet extends Component {
  render() {
    const {
      selectedAccount,
      onCopyAddress,
      accountMenu,
      onAccountMenuOptionsChange,
      onAliasChange,
      onAliasInputBlur,
      onAliasInputKeyPress,
      inputRef,
      theme,
      ...otherProps
    } = this.props;

    return (
      <div {...otherProps}>
        <AccountPanel
          inputRef={inputRef}
          onAliasChange={onAliasChange}
          onAliasInputKeyPress={onAliasInputKeyPress}
          onAliasInputBlur={onAliasInputBlur}
          selectedAccount={selectedAccount}
          onCopyAddress={onCopyAddress}
          className="account-detail-container"
          accountMenu={accountMenu}
          onAccountMenuOptionsChange={onAccountMenuOptionsChange}
        />
      </div>
    );
  }
}
