import React, { Component } from 'react';
import AccountDetails from '../account-details';
import { WalletDropHorizonIcon } from '../../common/icon';
import CloverMenu from '../../common/clover-menu';

export default class AccountPanel extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      selectedAccount,
      onCopyAddress,
      onAccountMenuOptionsChange,
      accountMenu,
      onAliasChange,
      onAliasInputBlur,
      onAliasInputKeyPress,
      inputRef,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <AccountDetails
          className="account-detail"
          address={selectedAccount.address}
          alias={selectedAccount.alias}
          onCopyAddress={onCopyAddress}
          inputRef={inputRef}
          editMode={selectedAccount.editMode ? selectedAccount.editMode : false}
          onAliasChange={event => {
            onAliasChange(event.target.value, selectedAccount);
          }}
          onAliasInputKeyPress={event => {
            onAliasInputKeyPress(event, selectedAccount);
          }}
          aliasValue={
            selectedAccount.editAlias !== undefined
              ? selectedAccount.editAlias
              : selectedAccount.alias
          }
          onAliasInputBlur={() => {
            onAliasInputBlur(selectedAccount);
          }}
        />
        <WalletDropHorizonIcon onClick={this.handleClick} />
        <CloverMenu
          options={accountMenu}
          onChange={option => {
            onAccountMenuOptionsChange(option, selectedAccount);
          }}
          anchorEl={anchorEl}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
