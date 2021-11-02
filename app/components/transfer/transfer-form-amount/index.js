import React, { Component } from 'react';
import FusoInput from '../../common/input';
import DropDown from '../../common/drop-down';

export default class TransferFormAmount extends Component {
  render() {
    const {
      error,
      label,
      value,
      helperText,
      onChange,
      inputRef,
      options,
      dropDownValue,
      propName,
      onDropDownChange,
      ...otherProps
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        {...otherProps}
      >
        <FusoInput
          style={{ width: '171.23px' }}
          error={error}
          label={label}
          value={value}
          name={propName}
          onChange={onChange(propName)}
          inputRef={inputRef}
        />
        <DropDown options={options} value={dropDownValue} onChange={onDropDownChange} />
      </div>
    );
  }
}
