import React, { Component } from 'react';
import CloverMenu from '../../common/clover-menu';
import FontRegular from '../../common/fonts/font-regular';
import { DISABLE_NETWORKS_PAGES_GROUP } from '../../../constants/navigation';
import { shortenName } from '../../../services/wallet-service';
import './styles.css';

export default class Network extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    const { page } = this.props;
    if (!DISABLE_NETWORKS_PAGES_GROUP.includes(page)) {
      this.setState({ anchorEl: event.currentTarget });
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      networks, network, onNetworkChange, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <FontRegular
          className="network-text"
          text={shortenName(network.text)}
          onClick={this.handleClick}
        />
        <CloverMenu
          selected={network}
          options={networks}
          onChange={onNetworkChange}
          anchorEl={anchorEl}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
