import React, { Component } from 'react';
import QRCode from 'qrcode-react';
import Avatar from '../identicon';
import './styles.css';

export default class QR extends Component {
  render() {
    const {
      value, theme, onCopyAddress, size, hideAvatar, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <QRCode size={size} value={value} />
        <Avatar
          hideAvatar={hideAvatar}
          value={value}
          theme={theme}
          onCopyAddress={onCopyAddress}
          size={80}
          className="qr-avatar"
        />
      </div>
    );
  }
}
