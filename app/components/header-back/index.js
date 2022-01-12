import React, { Component } from 'react';
import ArrowBack from '../../images/arrow_back.svg';
import './styles.css';

export default class HeaderBack extends Component {
  render() {
    const {
      handleBack, title, icon, style, rightButton, ...otherProps
    } = this.props;
    return (
      <div {...otherProps} className="header-wrapper">
        <div className="header-back-btn" onClick={handleBack}>
          <img width="16" height="16" src={icon || ArrowBack} alt="" />
        </div>
        <div className="header-title" style={{ ...style }}>
          {title}
        </div>
        {rightButton}
      </div>
    );
  }
}
