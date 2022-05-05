import React, { Component } from "react";
import WalletExpansionPanel from "../../common/wallet-expansion-panel";
import FontRegular from "../../common/fonts/font-regular";
import TransactionUI from "../transaction-ui";
import "./styles.css";
import DarkDivider from "../../common/divider/dark-divider";
import ClickToCopy from "../../common/click-to-copy";
import ButtonCustom from "../../common/buttons/button-custom";

const SignedMessage = (props) => (
  <div className={props.className}>
    <DarkDivider style={{ width: "100%" }} />
    <div className="send-data-container">
      <div>
        <FontRegular text="Data" className="send-data-label" />
      </div>
      <div>
        <ClickToCopy
          className="send-data clickable-icon"
          text={props.data}
          value={props.data}
          onCopy={props.onCopyData}
        />
      </div>
    </div>
    <DarkDivider style={{ width: "100%" }} />
  </div>
);
export default class Send extends Component {
  render() {
    const {
      fromAccount,
      toAccount,
      onCopyAddress,
      isSendExpanded,
      handleSendExpansion,
      handleInfoExpansion,
      isInfoExpanded,
      amount,
      onCancel,
      onAllow,
      errorMessage,
      txnUi,
      data,
      onCopyData,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <WalletExpansionPanel
          isBelowExpandIcon
          expanded={isSendExpanded}
          handleChange={handleSendExpansion}
        >
          {data && (
            <SignedMessage
              className="sign-message-body"
              data={data}
              onCopyData={onCopyData}
            />
          )}

          {txnUi && (
            <TransactionUI
              txnUi={txnUi}
              isInfoExpanded={isInfoExpanded}
              handleInfoExpansion={handleInfoExpansion}
              className="send-txn"
            />
          )}

          <div className="connect-request-button-wrap">
            <ButtonCustom
              onClick={onCancel}
              width="155px"
              className="button-sm-primary"
            >
              CANCEL
            </ButtonCustom>
            <ButtonCustom
              onClick={onAllow}
              width="155px"
              disabled={!!errorMessage}
              className="button-sm-secondary"
            >
              SIGN
            </ButtonCustom>
          </div>
          {errorMessage && (
            <FontRegular text={errorMessage} className="send-error" />
          )}
        </WalletExpansionPanel>
      </div>
    );
  }
}
