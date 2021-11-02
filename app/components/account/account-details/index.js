import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FontRegular from '../../common/fonts/font-regular';
import './styles.css';
import { shortenAddress } from '../../../services/wallet-service';
import CopyIcon from '../../../images/copy_hover.svg';
import ArrowIcon from '../../../images/select_down_icon_w.svg';

export default class AccountDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemLable: false,
    }
  }
  handleToggleCondition = () => {
    const { itemLable } = this.state;
    this.setState({ itemLable: !itemLable });
  }
  render() {
    const { itemLable } = this.state;
    const {
      assetsList,
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
          />
        )}
        <CopyToClipboard text={address} onCopy={onCopyAddress}>
          <div className="copy-card-container">
            <span className="card-address">{shortAddress}</span>
            <img src={CopyIcon} alt="copy" width="12" />
          </div>
        </CopyToClipboard>
        <div className="card-balance">
          <span>{assetsList&&assetsList.length?assetsList[0].taoTotal:'--'}</span><img src={ArrowIcon} className={`${itemLable?'roate180':'roate0'}`} onClick={this.handleToggleCondition} alt="arrow" width="13" />
        </div>
        <div className="balance-info" style={{ transition: 'all ease .4s',height: itemLable ? '56px' : '0px', overflow: 'hidden' }}>
          <p>Free: <span>{assetsList&&assetsList.length?assetsList[0].amount:'--'}</span></p>
          <p>Reserved: <span>{assetsList&&assetsList.length?assetsList[0].reserved:'--'}</span></p>
        </div>
      </div>
    );
  }
}
