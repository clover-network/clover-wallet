import React, { Component } from 'react';
import './styles.css';

export default class Trade extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  handleBack = () => {
    this.props.changePage(this.props.backupPage);
  };

  render() {
    // const { selectedToken } = this.state;
    // const { balance } = this.props;
    // console.log(selectedToken, balance);
    return <div>asdf</div>;
  }
}
