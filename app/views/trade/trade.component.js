import React, { Component } from 'react';
import { Find, IsEmpty } from 'react-lodash';
import './styles.css';

export default class Trade extends Component {
  handleBack = () => {
    this.props.changePage(this.props.backupPage);
  };

  render() {
    const { selectedToken, balance } = this.props;
    return (
      <React.Fragment>
        <div>{selectedToken}</div>
        <IsEmpty
          value={balance.tokens}
          yes={() => <React.Fragment />}
          no={() => (
            <Find collection={balance.tokens} predicate={token => token.token === selectedToken}>
              {token => token.balanceFormatted}
            </Find>
          )}
        />
      </React.Fragment>
    );
  }
}
