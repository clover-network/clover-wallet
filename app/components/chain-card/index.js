import React, { Component } from 'react';
import { IsEmpty } from 'react-lodash';
import './styles.css';
import { getChainCardStyle } from '../../utils/chain';
import { shortenAddress } from '../../services/wallet-service';

export default class ChainCard extends Component {
  render() {
    const { account, network, accountClicked } = this.props;
    return (
      <IsEmpty
        value={network}
        yes={() => <React.Fragment />}
        no={() => {
          const info = getChainCardStyle(network.unit);
          return (
            <div
              style={{ background: info.background }}
              className="card-container"
              onClick={() => accountClicked(account, network)}
            >
              <div className="text-container">
                <div className="account-name">{account.alias}</div>
                <div className="address">{shortenAddress(account.address)}</div>
              </div>
              <img src={info.img} alt="logo" width="30" className="card-logo" />
            </div>
          );
        }}
      />
    );
  }
}
