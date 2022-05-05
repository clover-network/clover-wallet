import React, { Component } from 'react';
import Logo from '../../../images/logo.svg';

export default class FusoLogo extends Component {
  render() {
    const { ...otherProps } = this.props;
    return <img src={Logo} {...otherProps} alt="logo" />;
  }
}
