import React, { Component } from 'react';
import * as RequestType from '../../../lib/constants/request-types';
import SignWeb3Message from '../../components/dapp/sign-web3-message';
import {
  copyAccountMessage,
  copyDataMessage,
} from '../../../lib/services/static-message-factory-service';
import './styles.css';

export default class DAppWeb3Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestId: '',
      isInfoExpanded: false,
    };
  }

  componentDidMount() {
    this.props.fetchNetwork();
  }

  onCopyAddress = () => {
    this.props.createToast({
      message: copyAccountMessage(),
      type: 'info',
    });
  };

  onCopyData = () => {
    this.props.createToast({
      message: copyDataMessage(),
      type: 'info',
    });
  };

  handleExpansion = id => () => {
    const { requestId } = this.state;

    this.setState({ requestId: requestId === id ? '' : id });
  };

  handleInfoExpansion = () => {
    const { isInfoExpanded } = this.state;
    this.setState({ isInfoExpanded: !isInfoExpanded });
  };

  handleAllow = request => () => {
    this.props.allowRequest(request);
    this.props.updateAppLoading(true);
  };

  handleCancel = request => () => {
    this.props.cancelDAppRequest(request);
  };

  renderRequests() {
    const { requests } = this.props;
    return (
      <div className="dapp-requests-container">
        {/* <SettingAccountDetails alias={account.alias} address={account.address} /> */}
        {requests.map(request => {
          switch (request.request.requestType) {
            case RequestType.WEB3_REQUEST:
              if (request.request.opts.method === 'eth_sendTransaction') {
                return (
                  <SignWeb3Message
                    isSignMessageExpanded
                    onCopyAddress={this.onCopyAddress}
                    handleSignMessageExpansion={this.handleExpansion(request.id)}
                    onCancel={this.handleCancel(request)}
                    onAllow={this.handleAllow(request)}
                    errorMessage={null}
                    data={request.request}
                    key={request.id}
                    onCopyData={this.onCopyData}
                    className="dapp-web3-requests-card"
                  />
                );
              }
              return <div key={request.id} />;

            default:
              return <div key={request.id} />;
          }
        })}
      </div>
    );
  }

  render() {
    return <div>{this.props.requests && this.renderRequests()}</div>;
  }
}
