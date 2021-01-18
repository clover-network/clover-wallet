import React, { Component } from 'react';
import RequestType from '../request-type';
import WalletExpansionPanel from '../../common/wallet-expansion-panel';
import FontRegular from '../../common/fonts/font-regular';
import FooterTwoSMButton from '../../common/footer-two-sm-button';
import Disclaimer from '../disclaimer';
import AccountItem from '../../account/account-item';
import DarkDivider from '../../common/divider/dark-divider';
import './styles.css';
import ClickToCopy from '../../common/click-to-copy';
import ButtonCustom from '../../common/buttons/button-custom';

const Summary = props => (
  <div className={props.className}>
    <RequestType
      type="Sign"
      blockchain={props.blockchain}
      className="sign-message-summary-request-type"
    />
    <AccountItem
      className="sign-message-summary-account-item"
      account={props.account}
      balance={props.balance}
      onCopyAddress={props.onCopyAddress}
    />
  </div>
);

const SignedMessage = props => (
  <div className={props.className}>
    <DarkDivider style={{ width: '100%' }} />
    <ClickToCopy
      className="signedmessage-data clickable-icon"
      text={props.data}
      value={props.data}
      onCopy={props.onCopyData}
    />
    <DarkDivider style={{ width: '100%' }} />
  </div>
);

export default class SignWeb3Message extends Component {
  render() {
    const {
      isSignMessageExpanded,
      handleSignMessageExpansion,
      onCopyAddress,
      onCancel,
      onAllow,
      errorMessage,
      data,
      onCopyData,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <WalletExpansionPanel
          isBelowExpandIcon
          expanded={isSignMessageExpanded}
          handleChange={handleSignMessageExpansion}
          summary={(
            <div/>
          )}
        >
          <div className="send-content">
            <div className="send-summary-send-to-from">
              <div>gas:</div>
              <div>{parseInt(data.opts.params[0].gas, 16)}</div>
            </div>
            <div className="send-summary-send-to-from">
              <div>gas price:</div>
              <div>{parseInt(data.opts.params[0].gasPrice, 16) + ' WEI'}</div>
            </div>
          </div>

          <div className="connect-request-button-wrap">
            <ButtonCustom onClick={onCancel} width="155px" color="#000000" background="white">
              CANCEL
            </ButtonCustom>
            <ButtonCustom
              onClick={onAllow}
              width="155px"
              color="#FB822A"
              background="white"
              disabled={!!errorMessage}
            >
              SIGN
            </ButtonCustom>
          </div>
        </WalletExpansionPanel>
      </div>
    );
  }
}
