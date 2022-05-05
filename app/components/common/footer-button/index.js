import React, { Component } from 'react';
import ButtonXL from '../buttons/button-xl';

export default class FooterButton extends Component {
  render() {
    const {
      style, name, onClick, disabled, ...otherProps
    } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          top: '532px',
          alignSelf: 'center',
          justifyContent: 'center',
          display: 'flex',
          left:16,
          right:16,
          ...style,
        }}
        {...otherProps}
      >
        <ButtonXL disabled={disabled} onClick={onClick}>
          {name}
        </ButtonXL>
      </div>
    );
  }
}
