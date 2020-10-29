import React, { Component } from 'react';
import { getChainLogo } from '../../utils/chain';
import './styles.css';

export default class Chain extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chain: props.network.unit,
    };
  }

  chainClicked = name => {
    this.setState({
      chain: name,
    });
  };

  render() {
    const { networks } = this.props;
    const { chain } = this.state;
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
          {networks.map(nt => (
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
        <div className="right-panel">11</div>
      </div>
    );
  }
}
