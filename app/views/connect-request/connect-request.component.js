import React, { Component } from 'react';
import FavIcon from '../../components/common/fav-icon';
import FontRegular from '../../components/common/fonts/font-regular';
import { trimUrl } from '../../services/wallet-service';
import { SolidPlug, SolidWallet, File } from '../../components/common/icon';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import './styles.css';
import ButtonCustom from '../../components/common/buttons/button-custom';
import Connect from '../../images/connect.svg';

const DAppURL = ({ favIconUrl, url, ...otherProps }) => (
  <div {...otherProps}>
    {favIconUrl ? (
      <FavIcon favIconUrl={favIconUrl} width="44" height="44" className="connect-request-favicon" />
    ) : (
      <File className="connect-request-favicon" />
    )}
    <FontRegular text={trimUrl(url)} className="connect-request-favicon-url" />
  </div>
);

export default class ConnectRequest extends Component {
  componentDidMount() {
    this.props.updateAppLoading(true);
    this.props.initializeRequest();
    this.props.updateAppLoading(false);
    this.props.fetchNetwork();
  }

  onDeny = () => {
    this.props.denyAccountAuthorization();
  };

  onAllow = () => {
    this.props.allowAccountAuthorization();
  };

  onCopyAddress = () => {
    this.props.createToast({
      message: copyAccountMessage(),
      type: 'info',
    });
  };

  renderHeader() {
    const { request } = this.props;
    return (
      <div className="connect-request-header">
        <DAppURL
          favIconUrl={request.sender.tab.favIconUrl}
          url={request.request.metadata.url}
          className="connect-request-dapp-url-container"
        />
        <SolidPlug className="connect-request-plug-icon" />
        <SolidWallet className="connect-request-wallet-icon" />
      </div>
    );
  }

  render() {
    const { request } = this.props;
    return (
      <div>
        <div style={{ marginTop: '60px' }}>
          <div className="connect-request-img">
            <img
              width="44"
              height="44"
              src={Connect}
              aria-hidden="true"
              onClick={this.handleClick}
              alt="connect"
            />
          </div>
          <div className="connect-request-title">Connect Request</div>
        </div>
        <FontRegular
          text={(
            <div
              style={{
                fontSize: '14px',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {`${request.request.metadata.url} is requesting access to a/an `}
              account. Click allow to grant access any account or click DENY to prevent access to
              any account.
            </div>
          )}
          className="connect-request-center connect-request-account-selection-header"
        />
        <div className="connect-request-button-wrap">
          <ButtonCustom onClick={this.onDeny} width="155px" color="#000000" background="white">
            deny
          </ButtonCustom>
          <ButtonCustom onClick={this.onAllow} width="155px" color="#FB822A" background="white">
            allow
          </ButtonCustom>
        </div>
      </div>
    );
  }
}
