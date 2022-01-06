import React, { Component } from 'react';
import PasswordAdornment from '../password-adornment';
import FusoInput from '../../input';

const showColor = {
  color: '#8A8C9B',
};

const hideColor = {
  color: '#8A8C9B',
};

export default class FusoPassword extends Component {
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
      className,
      handleClickShowPassword,
      ...otherProps
    } = this.props;
    const { showPassword } = this.state;
    return (
      <div className={className}>
        <FusoInput
          {...otherProps}
          className={className}
          error={isError}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onChange('password')}
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
