import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classnames from 'classnames';
import CloverContainer from '../clover-container';
import Header from '../common/header/header.component';
import ViewSelector from '../view-selector';
import Network from '../network/network';
import Options from '../options';
import CloverBanner from '../common/clover-banner';
import CloverLogo from '../common/clover-logo';
import './styles.css';

export default class CloverApp extends Component {
  render() {
    const {
      page,
      isLoading,
      networks,
      network,
      onNetworkChange,
      onNetworkClick,
      showLogo,
      showBanner,
      showNetwork,
      isConnected,
      showSettings,
      showHeader,
      onLogoClick,
      options,
      onOptionsChange,
      isDeveloperMode,
      onToggleDeveloperMode,
      ...otherProps
    } = this.props;

    const CloverHeaderClassNames = classnames({
      'clover-header': showHeader,
      'clover-header-banner':
        showHeader && showBanner && !showLogo && !showNetwork && !showSettings,
      'clover-header-boarded': showHeader && !showBanner && showLogo && showNetwork && showSettings,
      'display-none': !showHeader,
    });

    const CloverLogoClassNames = classnames({
      'clover-logo': showLogo,
      'display-none': !showLogo,
      'clickable-icon': showLogo,
    });
    const CloverNetworkClassNames = classnames({
      'clover-network': showNetwork,
      'display-none': !showNetwork,
    });
    const CloverBannerClassNames = classnames({
      'clover-banner': showBanner,
      'display-none': !showBanner,
    });
    const CloverSettingsClassNames = classnames({
      'clover-settings': showSettings,
      'display-none': !showSettings,
    });
    const CloverConfigClassNames = classnames({
      'clover-config': showNetwork && showSettings,
      'display-none': showBanner,
    });
    return (
      <CloverContainer blocking={isLoading}>
        <div {...otherProps}>
          <Header page={page} className={CloverHeaderClassNames}>
            <CloverLogo onClick={onLogoClick} className={CloverLogoClassNames} />
            <CloverBanner className={CloverBannerClassNames} />
            <div className={CloverConfigClassNames}>
              <Options
                onToggleDeveloperMode={onToggleDeveloperMode}
                options={options}
                onOptionsChange={onOptionsChange}
                className={CloverSettingsClassNames}
                isDeveloperMode={isDeveloperMode}
                page={page}
              />
              <Network
                networks={networks}
                network={network}
                onNetworkClick={onNetworkClick}
                onNetworkChange={onNetworkChange}
                className={CloverNetworkClassNames}
                page={page}
              />
            </div>
          </Header>
          <ViewSelector page={page} />
          <ToastContainer />
        </div>
      </CloverContainer>
    );
  }
}
