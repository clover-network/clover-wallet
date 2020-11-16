import React, { Component } from 'react';
import { getChainLogo } from '../../utils/chain';
import './styles.css';
import ChainCard from '../../components/chain-card';
import Close from '../../images/close.svg';

export default class Chain extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chain: props.network.unit,
      networks: props.networks,
    };
  }

  componentDidMount() {
    this.setState({
      chain: 'ALL',
    });
  }

  chainClicked = name => {
    this.setState({
      chain: name,
      networks:
        name === 'ALL' ? this.props.networks : this.props.networks.filter(n => n.unit === name),
    });
  };

  handleClose = () => {
    this.props.changePage(this.props.backupPage);
  };

  accountClicked = async (account, network) => {
    this.handleClose();
    try {
      await this.props.switchNetwork(network);
      this.props.changeAccount(account);
    } catch (e) {
      this.props.updateAppLoading(false);
      this.props.createToast({
        message: `Failed to connect ${network.unit} chain...`,
        type: 'error',
      });
    }
  };

  render() {
    const { fullChainAccounts } = this.props;
    const { chain, networks } = this.state;
    return (
      <div className="container">
        <div className="panel-container">
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
            {this.props.networks.map((nt, index) => (
              <React.Fragment key={`chain_logo_${index.toString()}`}>
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
            {fullChainAccounts.map((fullChainAccount, netIdx) => fullChainAccount.accounts.map((acc, accIdx) => (
              <ChainCard
                account={acc}
                network={networks.find(net => net.unit === fullChainAccount.symbol)}
                key={`card_logo_${netIdx.toString()}_${accIdx.toString()}`}
                accountClicked={this.accountClicked}
              />
            )),)}
          </div>
        </div>
        <div className="footer" onClick={this.handleClose}>
          <img src={Close} alt="close" aria-hidden="true" width="20" />
          <span className="close">CLOSE</span>
        </div>
      </div>
    );
  }
}
