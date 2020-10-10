import React, { Component } from 'react';
import Logo from '../../../images/clover_logo.png';

export default class CloverLogo extends Component {
  render() {
    const { ...otherProps } = this.props;
    return <img src={Logo} {...otherProps} alt="clover_logo" />;
  }
}
