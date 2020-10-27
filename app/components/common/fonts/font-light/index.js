import React, { PureComponent } from 'react';

export default class FontLight extends PureComponent {
  render() {
    const { style, text, ...otherProps } = this.props;
    return (
      <div
        style={{
          fontFamily: 'Inter',
          ...style,
        }}
        {...otherProps}
      >
        {text}
      </div>
    );
  }
}
