import React, { Component } from 'react';
import './styles.css';
import Close from '../../images/close.svg';

export default class Settings extends Component {
  handleClose = () => {
    this.props.changePage(this.props.backupPage);
  };

  render() {
    return (
      <div className="container">
        <div className="footer" onClick={this.handleClose}>
          <img src={Close} alt="close" aria-hidden="true" width="20" />
          <span className="close">CLOSE</span>
        </div>
      </div>
    );
  }
}
