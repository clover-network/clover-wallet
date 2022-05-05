import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  DASHBOARD_PAGE,
  CUSTOM_NETWORK_PAGE,
  LOADER_OVERLAY,
  SIGN_IN_PAGE,
  CHAIN_PAGE,
  CONNECT_REQUEST_PAGE,
  ONBOARDING_PAGES_GROUP,
  SETTINGS_PAGE,
  QR_CODE_PAGE,
  TRANSFER_STATUS_PAGE,
  CREATE_ADDRESS_BOOK_PAGE,
  ADDRESS_BOOK_PAGE,
  NODE_SETTING_PAGE,
  NODE_LIST_PAGE,
  MANAGE_ACCOUNT_PAGE,
  DAPP_REQUESTS_PAGE,
  ENTRY_PAGE,
} from '../constants/navigation';
import FusoApp from '../components/fuso-app';
import './styles.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: false,
      showLogo: false,
      showBanner: false,
      showNetwork: false,
      showSettings: false,
    };
  }

  componentDidMount() {
    this.props.updateBackupPage(this.props.page);
    this.props.fetchAndUpdateAppManifest();
    this.props.updateAppLoading(true);
    this.props.onBoard();
  }

  static getDerivedStateFromProps(prevProps, nextState) {
    // below vars are from 'nextState' and we are overwriting to hide/show as per page

    const hideNetworkPages = [
      CHAIN_PAGE,
      CONNECT_REQUEST_PAGE,
      TRANSFER_STATUS_PAGE,
      CREATE_ADDRESS_BOOK_PAGE,
      ADDRESS_BOOK_PAGE,
      NODE_SETTING_PAGE,
      NODE_LIST_PAGE,
      MANAGE_ACCOUNT_PAGE,
      DAPP_REQUESTS_PAGE,
    ];
    const hideSettingPages = [
      CHAIN_PAGE,
      CONNECT_REQUEST_PAGE,
      TRANSFER_STATUS_PAGE,
      CREATE_ADDRESS_BOOK_PAGE,
      ADDRESS_BOOK_PAGE,
      NODE_SETTING_PAGE,
      NODE_LIST_PAGE,
      MANAGE_ACCOUNT_PAGE,
      DAPP_REQUESTS_PAGE,
    ];
    if (prevProps.page !== LOADER_OVERLAY) {
      if (ONBOARDING_PAGES_GROUP.indexOf(prevProps.page) !== -1) {
        return {
          showHeader: prevProps.page !== SIGN_IN_PAGE,
          showLogo: false,
          showBanner: true,
          showNetwork: false,
          showSettings: false,
        };
      }
      return {
        showHeader: prevProps.page !== QR_CODE_PAGE && prevProps.page !== ENTRY_PAGE,
        showLogo: false,
        showBanner: true,
        showNetwork: !_.includes(hideNetworkPages, prevProps.page),
        showSettings: !_.includes(hideSettingPages, prevProps.page),
      };
    }

    return nextState;
  }

  handleNetworkChange = network => {
    if (network.value === 'custom') {
      this.props.updateBackupPage(this.props.page);
      this.props.changePage(CUSTOM_NETWORK_PAGE);
    } else {
      this.props.switchNetwork(network);
    }
  };

  handleNetworkClick = () => {
    this.props.updateBackupPage(this.props.page);
    this.props.changePage(CHAIN_PAGE);
  };

  handSettingsClick = () => {
    this.props.updateBackupPage(this.props.page);
    this.props.changePage(SETTINGS_PAGE);
  };

  handleOptionsChange = option => {
    this.props.updateBackupPage(this.props.page);
    this.props.changePage(option.value);
  };

  onToggleDeveloperMode = event => {
    const isDeveloperMode = event.target.checked;
    this.props.onToggleDeveloperMode(isDeveloperMode);
  };

  onClick = () => {
    this.props.resetConfirmOnBoarding();
    this.props.clearTransferDetails();
    this.props.changePage(DASHBOARD_PAGE);
  };

  render() {
    const {
      props: {
        page, isLoading, networks, network, isConnected, isDeveloperMode, options
      },
      state: {
        showLogo, showBanner, showNetwork, showSettings, showHeader
      },
    } = this;
    return (
      <FusoApp
        className="app"
        isLoading={isLoading}
        page={page}
        networks={networks}
        network={network}
        isConnected={isConnected}
        onNetworkChange={this.handleNetworkChange}
        onNetworkClick={this.handleNetworkClick}
        onSettingsClick={this.handSettingsClick}
        showLogo={showLogo}
        showBanner={showBanner}
        showNetwork={showNetwork}
        showSettings={showSettings}
        showHeader={showHeader}
        onLogoClick={this.onClick}
        options={options}
        onOptionsChange={this.handleOptionsChange}
        isDeveloperMode={isDeveloperMode}
        onToggleDeveloperMode={this.onToggleDeveloperMode}
      />
    );
  }
}

App.propTypes = {
  page: PropTypes.string,
  switchNetwork: PropTypes.func,
  changePage: PropTypes.func,
};

App.defaultProps = {
  page: DASHBOARD_PAGE,
  switchNetwork: undefined,
  changePage: undefined,
};
