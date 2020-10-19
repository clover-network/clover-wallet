import React, { Component } from 'react';
import ButtonXL from '../buttons/button-xl';

export default class FooterButton extends Component {
  render() {
    const {
      style, name, onClick, ...otherProps
    } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          top: '524px',
          alignSelf: 'center',
          justifyContent: 'center',
          display: 'flex',
          ...style,
        }}
        {...otherProps}
      >
        <ButtonXL onClick={onClick}>{name}</ButtonXL>
      </div>
    );
  }
}
