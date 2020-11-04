import React, { Component } from 'react';
import CloverMenu from '../common/clover-menu';
import { DISABLE_SETTINGS_PAGES_GROUP } from '../../constants/navigation';
import Settings from '../../images/setting.svg';

export default class Options extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    const { page } = this.props;
    if (!DISABLE_SETTINGS_PAGES_GROUP.includes(page)) {
      this.setState({ anchorEl: event.currentTarget });
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      isDeveloperMode,
      onToggleDeveloperMode,
      options,
      onOptionsChange,
      onSettingsClick,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <img
          src={Settings}
          aria-hidden="true"
          onClick={onSettingsClick}
          alt="settings"
          width="26"
        />
        <CloverMenu
          isDeveloperMode={isDeveloperMode}
          onToggleDeveloperMode={onToggleDeveloperMode}
          options={options}
          onChange={onOptionsChange}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          width="170px"
        />
      </div>
    );
  }
}
