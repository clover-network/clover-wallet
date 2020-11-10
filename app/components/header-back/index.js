import React, { Component } from 'react';
import ArrowLeft from '../../images/arrow_left.svg';
import './styles.css';

export default class HeaderBack extends Component {
  render() {
    const {
      handleBack, title, icon, style, ...otherProps
    } = this.props;
    return (
      <div {...otherProps} className="header-wrapper">
        <div className="header-back-btn" onClick={handleBack}>
          <img width="12" height="12" src={icon || ArrowLeft} alt="" />
        </div>
        <div className="header-title" style={{ ...style }}>
          {title}
        </div>
      </div>
    );
  }
}
