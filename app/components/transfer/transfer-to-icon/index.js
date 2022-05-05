import React, { Component } from 'react';
import Avatar from '../../common/identicon';
import FusoInput from '../../common/input';
import AddressBookAdorment from '../address-book-adornment';

export default class TransferToIcon extends Component {
  render() {
    const {
      addressValue,
      toValue,
      size,
      theme,
      isError,
      label,
      propName,
      errorMessage,
      onChange,
      onBlur,
      inputRef,
      onAddressBookClick,
      ...otherProps
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        {...otherProps}
      >
        <Avatar value={addressValue} size={size} theme={theme} />
        <FusoInput
          style={{
            width: '251px',
            justifySelf: 'flex-start',
            marginLeft: '22px',
          }}
          value={toValue}
          error={isError}
          label={label}
          name={propName}
          onChange={onChange(propName)}
          onBlur={onBlur}
          inputRef={inputRef}
          spellCheck={false}
          InputProps={{
            endAdornment: <AddressBookAdorment position="end" onClick={onAddressBookClick} />,
          }}
        />
      </div>
    );
  }
}
