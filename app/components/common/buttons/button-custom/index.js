import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

class ButtonCustom extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const { ...otherProps } = this.props;
    const ButtonCustom = styled(Button)`
      font-size: 14px;
      font-family: 'Inter-Bold';
      font-style: normal;
      height: 45px;
      border: ${this.props.border ? this.props.border : 'none'};
      width: ${this.props.width ? this.props.width : '320px'};
      background: ${this.props.background
    ? this.props.background
    : 'linear-gradient(94.54deg, #FF8212 0%, #ED4454 100%)'};
      color: ${this.props.color ? this.props.color : '#FFFFFF'};
    `;
    return (
      <div>
        <ButtonCustom disabled={this.props.disabled} onClick={this.props.onClick} {...otherProps}>
          {this.props.children}
        </ButtonCustom>
      </div>
    );
  }
}

export default ButtonCustom;
