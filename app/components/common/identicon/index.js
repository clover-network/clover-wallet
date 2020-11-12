import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Identicon from '@polkadot/react-identicon';

export default class Avatar extends Component {
  render() {
    const {
      size, style, value, theme, onCopyAddress, hideAvatar, ...otherProps
    } = this.props;
    return (
      <div
        style={{ style, display: hideAvatar ? 'none' : 'block' }}
        {...otherProps}
        onClick={onCopyAddress}
      >
        <Identicon value={value} size={size} theme={theme} />
      </div>
    );
  }
}

Avatar.defaultProps = {
  size: 40,
  value: undefined,
  theme: 'polkadot',
};

Avatar.propTypes = {
  size: PropTypes.number,
  value: PropTypes.string,
  theme: PropTypes.string,
};
