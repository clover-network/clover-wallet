import React, { Component } from 'react';

export default class DarkDivider extends Component {
  render() {
    const { style, ...otherProps } = this.props;

    return (
      <div
        style={{
          width: '100vw',
          height: '1px',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          ...style,
        }}
        {...otherProps}
      />
    );
  }
}
