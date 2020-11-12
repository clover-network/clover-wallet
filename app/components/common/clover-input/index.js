import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { styles } from './styles';

class CloverInput extends Component {
  render() {
    const {
      classes, InputProps, placeholderText, ...otherProps
    } = this.props;
    return (
      <OutlinedInput
        placeholder={placeholderText}
        labelWidth={0}
        inputProps={{
          className: classes.cloverInput,
        }}
        {...otherProps}
      />
    );
  }
}

export default withStyles(styles)(CloverInput);
