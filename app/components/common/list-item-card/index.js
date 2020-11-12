import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '../identicon';
import CloverMenu from '../clover-menu';
import DarkDivider from '../divider/dark-divider';
import './styles.css';
import { shortenAddress } from '../../../services/wallet-service';
import MoreVertIcon from '../../../images/more_vert_icon.svg';

class ListItemCard extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleNullBalanceObject = (balObj, account) => {
    if (!balObj) {
      return {
        balanceFormatted: '0.0',
        token: account.token,
      };
    }
    return balObj;
  };

  render() {
    const {
      classes,
      address,
      listItem,
      primaryText,
      onCopyAddress,
      onMoreMenuOptionsChange,
      moreMenu,
      handleListItemAvatarClick,
      handleListItemClick,
      isMoreVertIconVisible,
      theme,
      ...otherProps
    } = this.props;
    const { anchorEl } = this.state;
    return (
      <div {...otherProps}>
        <ListItem>
          <ListItemAvatar onClick={event => handleListItemAvatarClick(event, listItem)}>
            <Avatar
              className="account-avatar"
              onCopyAddress={onCopyAddress}
              value={address}
              theme={theme}
              style={{ cursor: 'pointer !important' }}
            />
          </ListItemAvatar>
          <div className="address-account-info-wrapper">
            <div>{primaryText}</div>
            <span>{shortenAddress(address)}</span>
          </div>
          {isMoreVertIconVisible && (
            <div className="more-list-icon" onClick={this.handleClick}>
              <img width="20" height="20" src={MoreVertIcon} alt="" />
            </div>
          )}
          <CloverMenu
            options={moreMenu}
            onChange={option => {
              onMoreMenuOptionsChange(option, listItem);
            }}
            anchorEl={anchorEl}
            onClose={this.handleClose}
          />
        </ListItem>
        <DarkDivider style={{ width: '100%' }} />
      </div>
    );
  }
}

const styles = () => ({
  primaryWidth: {
    width: '290px !important',
    padding: '0 10px !important',
  },
});

export default withStyles(styles)(ListItemCard);
