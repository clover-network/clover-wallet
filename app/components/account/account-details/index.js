import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FontRegular from '../../common/fonts/font-regular';
import './styles.css';
import { shortenAddress } from '../../../services/wallet-service';
import CopyIcon from '../../../images/copy_hover.svg';

export default class AccountDetails extends Component {
  render() {
    const {
      alias,
      onCopyAddress,
      address,
      editMode,
      onAliasChange,
      aliasValue,
      onAliasInputBlur,
      onAliasInputKeyPress,
      fontSize,
      inputRef,
      ...otherProps
    } = this.props;
    const shortAddress = shortenAddress(address);
    return (
      <div {...otherProps}>
        {!editMode && (
          <FontRegular className="account-alias" text={alias} style={fontSize && { fontSize }} />
        )}
        {editMode && (
          <OutlinedInput
            labelWidth={0}
            inputRef={inputRef}
            value={aliasValue}
            onBlur={onAliasInputBlur}
            onChange={onAliasChange}
            classes={{
              root: 'card-input-root',
              input: 'card-input',
              focused: 'card-input-focused',
              notchedOutline: 'card-input-focused',
            }}
            onKeyPress={onAliasInputKeyPress}
            withWhiteColor
          />
        )}
        <CopyToClipboard text={address} onCopy={onCopyAddress}>
          <div className="copy-card-container">
            <span className="card-address">{shortAddress}</span>
            <img src={CopyIcon} alt="copy" width="12" />
          </div>
        </CopyToClipboard>
        <div className="card-balance">$ --.--</div>
      </div>
    );
  }
}
