import React, { Component } from 'react';
import CloverInputAdornment from '../../common/clover-input-adornment';
import IconContainer from '../../common/icon-container';
import { AddressBook } from '../../common/icon';

export default class AddressBookAdornment extends Component {
  render() {
    const { onClick, ...otherProps } = this.props;
    return (
      <CloverInputAdornment {...otherProps}>
        <IconContainer aria-label="Toggle password visibility" onClick={onClick}>
          <AddressBook />
        </IconContainer>
      </CloverInputAdornment>
    );
  }
}
