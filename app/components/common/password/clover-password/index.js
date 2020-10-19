import React, { Component } from 'react';
import PasswordAdornment from '../password-adornment';
import CloverInput from '../../clover-input';

const showColor = {
  color: 'rgba(215, 95, 160, 1)',
};

const hideColor = {
  color: 'rgba(0, 0, 0, 0.5)',
};

export default class CloverPassword extends Component {
  state = {
    showPassword: false,
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const {
      classes,
      children,
      onChange,
      isError,
      password,
      errorMessage,
      className,
      handleClickShowPassword,
      ...otherProps
    } = this.props;
    const { showPassword } = this.state;
    return (
      <div className={className}>
        <CloverInput
          {...otherProps}
          className={className}
          error={isError}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onChange('password')}
          helperText={errorMessage}
          endAdornment={(
            <PasswordAdornment
              position="end"
              onClick={this.handleClickShowPassword}
              showPassword={showPassword}
              showColor={showColor}
              hideColor={hideColor}
            />
          )}
        />
      </div>
    );
  }
}
