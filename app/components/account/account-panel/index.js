import React, { Component } from 'react';
import AccountDetails from '../account-details';
import { WalletDropHorizonIcon } from '../../common/icon';
import FusoMenu from '../../common/menu';

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
  resetAlias = () => {
    const {accountMenu,selectedAccount,onAccountMenuOptionsChange} = this.props;
    onAccountMenuOptionsChange(accountMenu[0], selectedAccount);
  }
  render() {
    const { anchorEl } = this.state;
    const {
      selectedAccount,
      assetsList,
      onCopyAddress,
      onAccountMenuOptionsChange,
      accountMenu,
      onAliasChange,
      onAliasInputBlur,
      onAliasInputKeyPress,
      inputRef,
      ...otherProps
    } = this.props;
    // console.log("accountMenu -- > ",accountMenu[0])
    // console.log("selectedAccount -- > ",selectedAccount)

    return (
      <div {...otherProps}>
        <AccountDetails
          className="account-detail"
          address={selectedAccount.address}
          alias={selectedAccount.alias}
          assetsList={assetsList}
          onCopyAddress={onCopyAddress}
          resetAlias={this.resetAlias}
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
        {/* <WalletDropHorizonIcon onClick={this.handleClick} /> */}
        <FusoMenu
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
