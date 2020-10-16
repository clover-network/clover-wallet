import React, { Component } from 'react';
import Banner from '../../../images/clover_banner.svg';

export default class CloverBanner extends Component {
  render() {
    const { ...otherProps } = this.props;
    return <img src={Banner} alt="clover-banner" {...otherProps} />;
  }
}
