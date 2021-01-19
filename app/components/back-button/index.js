import React, { Component } from 'react';
import BackArrow from '../../images/back_arrow.svg';
import './styles.css';

export default class BackButton extends Component {
  render() {
    return (
      <div className="back-wrapper">
        <img height={7} width={4} src={BackArrow} alt="" />
        <span>Back</span>
      </div>
    );
  }
}
