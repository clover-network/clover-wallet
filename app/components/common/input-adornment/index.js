import React, { Component } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';

export default class FusoInputAdornment extends Component {
  render() {
    const { children, ...otherProps } = this.props;
    return <InputAdornment {...otherProps}>{children}</InputAdornment>;
  }
}
