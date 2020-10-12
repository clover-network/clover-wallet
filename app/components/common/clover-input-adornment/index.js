import React, { Component } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';

export default class CloverInputAdornment extends Component {
  render() {
    const { children, ...otherProps } = this.props;
    return <InputAdornment {...otherProps}>{children}</InputAdornment>;
  }
}
