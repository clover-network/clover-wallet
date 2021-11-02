import React, { Component } from 'react';
import Banner from '../../../images/fuso_banner.svg';

export default class FusoBanner extends Component {
  render() {
    const { ...otherProps } = this.props;
    return <img src={Banner} alt="banner" {...otherProps} />;
  }
}
