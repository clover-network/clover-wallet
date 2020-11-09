import React, { Component } from 'react';
import './styles.css';

export default class ConfirmQuote extends Component {
  render() {
    const { description, price, ...otherProps } = this.props;
    return (
      <div {...otherProps} className="confirm-quote-wrapper">
        <span className="confirm-quote-description">{description}</span>
        <span className="confirm-quote-price">{price}</span>
        {/*<FontMedium className="confirm-quote-description" text={description} />*/}
        {/*<FontRegular className="confirm-quote-price" text={price} />*/}
      </div>
    );
  }
}
