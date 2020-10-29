import React, { Component } from 'react';
import { getChainLogo } from '../../utils/chain';
import './styles.css';
import ChainCard from '../../components/chain-card';

export default class Chain extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chain: props.network.unit,
      networks: props.networks,
    };
  }

  chainClicked = name => {
    this.setState({
      chain: name,
      networks:
        name === 'ALL' ? this.props.networks : this.props.networks.filter(n => n.unit === name),
    });
  };

  render() {
    const { accounts } = this.props;
    const { chain, networks } = this.state;

    return (
      <div className="container">
        <div className="left-panel">
          <img
            src={getChainLogo('ALL', chain === 'ALL')}
            alt="logo"
            width="35"
            onClick={() => this.chainClicked('ALL')}
            aria-hidden="true"
            className="can-click"
          />
          <span className={chain === 'ALL' ? 'split split-select' : 'split'} />
          {this.props.networks.map(nt => (
            <React.Fragment>
              <img
                src={getChainLogo(nt.unit, chain === nt.unit)}
                alt="logo"
                width="35"
                onClick={() => this.chainClicked(nt.unit)}
                aria-hidden="true"
                className="can-click"
              />
              <span className={chain === nt.unit ? 'split split-select' : 'split'} />
            </React.Fragment>
          ))}
        </div>
        <div className="right-panel">
          {networks.map(net => accounts.map(acc => <ChainCard account={acc} network={net} />))}
        </div>
      </div>
    );
  }
}
