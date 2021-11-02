import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classnames from "classnames";
import FusoContainer from "../fuso-container";
import Header from "../common/header/header.component";
import ViewSelector from "../view-selector";
import Network from "../network/network";
import Options from "../options";
import FusoBanner from "../common/banner";
import FusoLogo from "../common/logo";
import "./styles.css";

export default class FusoApp extends Component {
  render() {
    const {
      page,
      isLoading,
      networks,
      network,
      onNetworkChange,
      onNetworkClick,
      onSettingsClick,
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

    const FusoHeaderClassNames = classnames({
      "fuso-header": showHeader,
      "fuso-header-banner":
        showHeader && showBanner && !showLogo && !showNetwork && !showSettings,
      "fuso-header-boarded":
        showHeader && !showBanner && showLogo && showNetwork && showSettings,
      "display-none": !showHeader,
    });

    const FusoLogoClassNames = classnames({
      "fuso-logo": showLogo,
      "display-none": !showLogo,
      "clickable-icon": showLogo,
    });
    const FusoNetworkClassNames = classnames({
      "fuso-network": showNetwork,
      "display-none": !showNetwork,
    });
    const FusoBannerClassNames = classnames({
      "fuso-banner": showBanner,
      "display-none": !showBanner,
    });
    const FusoSettingsClassNames = classnames({
      "fuso-settings": showSettings,
      "display-none": !showSettings,
    });
    const FusoConfigClassNames = classnames({
      "fuso-config": showNetwork && showSettings,
      "display-none": showBanner,
    });
    return (
      <FusoContainer blocking={isLoading}>
        <div {...otherProps}>
          <Header page={page} className={FusoHeaderClassNames}>
            <FusoLogo onClick={onLogoClick} className={FusoLogoClassNames} />
            <FusoBanner className={FusoBannerClassNames} />
            <div className={FusoConfigClassNames}>
              <Options
                onToggleDeveloperMode={onToggleDeveloperMode}
                options={options}
                onOptionsChange={onOptionsChange}
                className={FusoSettingsClassNames}
                isDeveloperMode={isDeveloperMode}
                onSettingsClick={onSettingsClick}
                page={page}
              />
              <Network
                networks={networks}
                network={network}
                onNetworkClick={onNetworkClick}
                onNetworkChange={onNetworkChange}
                className={FusoNetworkClassNames}
                page={page}
              />
            </div>
          </Header>
          <ViewSelector page={page} />
          <ToastContainer />
        </div>
      </FusoContainer>
    );
  }
}
