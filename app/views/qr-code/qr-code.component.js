import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { DASHBOARD_PAGE } from '../../constants/navigation';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import { findChainByName } from '../../../lib/constants/chain';
import HeaderBack from '../../components/header-back';
import ArrowLeftWhite from '../../images/arrow_left_white.svg';
import QR from '../../components/common/qr';
import './style.css';
import CloseWhite from '../../images/close_white.svg';

export default class QRCode extends Component {
  handleSubheaderBackBtn = () => {
    this.props.changePage(DASHBOARD_PAGE);
  };

  onCopy = () => {
    this.props.createToast({ message: copyAccountMessage(), type: 'info' });
  };

  render() {
    const { selectedToken, account, network } = this.props;
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    const hideAvatar = true;
    return (
      <div className="container qr-code-wrapper">
        <HeaderBack
          fontColor="#ffffff"
          icon={ArrowLeftWhite}
          handleBack={this.handleSubheaderBackBtn}
          title="RECEIVE"
        />
        <div className="qr-code-content-wrap">
          <div className="qr-code-content">
            <span className="qr-code-name">{`${selectedToken} QR CODE`}</span>
            <QR
              theme={theme}
              className="qr-address"
              hideAvatar={hideAvatar}
              onCopyAddress={this.onCopy}
              size={180}
              value={account.address}
            />
            <div className="qr-code-address">
              <h3>Address</h3>
              <span>{account.address}</span>
            </div>
          </div>
          <div style={{ marginLeft: '18px' }}>
            <Button
              className="copy-address-btn"
              onClick={this.onCopy}
              style={{ marginRight: '10px' }}
            >
              COPY ADDRESS
            </Button>
          </div>
        </div>
        <div className="footer" onClick={this.handleSubheaderBackBtn}>
          <img src={CloseWhite} alt="close" aria-hidden="true" width="20" />
          <span className="close" style={{ color: '#ffffff' }}>
            CLOSE
          </span>
        </div>
      </div>
    );
  }
}
