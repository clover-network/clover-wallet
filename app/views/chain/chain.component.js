import React, { Component } from "react";
import { getChainLogo } from "../../utils/chain";
import "./styles.css";
import ChainCard from "../../components/chain-card";
import Close from "../../images/close.svg";
import HeaderBack from '../../components/header-back';
import ArrowLeft from '../../images/arrow_back.svg';

export default class Chain extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chain: props.network.unit,
      networks: props.networks,
      activeIndex:0
    };
  }

  componentDidMount() {
    this.setState({
      chain: "ALL",
    });
  }

  chainClicked = (name,index) => {
    this.setState({
      chain: name,
      activeIndex:index,
      networks:
        name === "ALL"
          ? this.props.networks
          : this.props.networks.filter((n) => n.unit === name),
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
        type: "error",
      });
    }
  };

  render() {
    const { fullChainAccounts } = this.props;
    const { chain, networks } = this.state;
    return (
      <div className="container">
        <HeaderBack icon={ArrowLeft} handleBack={this.handleClose} title="SELECT ACCOUNTS" />
        <div className="panel-container">
          <div className="left-panel">
            <img
              src={getChainLogo("ALL", chain === "ALL")}
              alt="logo"
              width="35"
              onClick={() => this.chainClicked("ALL",0)}
              aria-hidden="true"
              className="can-click"
            />
            <span className="activeStatus" style={{top:chain === "ALL" ?"8px":(Number(this.state.activeIndex)*59+68)+"px"}}></span>
            <span
              className={chain === "ALL" ? "split split-select" : "split"}
            />
            {this.props.networks.map((nt, index) => (
              <React.Fragment key={`chain_logo_${index.toString()}`}>
                <img
                  src={getChainLogo(nt.unit, chain === nt.unit)}
                  alt="logo"
                  width="35"
                  onClick={() => this.chainClicked(nt.unit,index)}
                  aria-hidden="true"
                  className={chain === nt.unit ? "can-click active" : "can-click"}
                />
                <span
                  className={chain === nt.unit ? "split split-select" : "split"}
                />
              </React.Fragment>
            ))}
          </div>
          <div className="right-panel">
            {fullChainAccounts.map((fullChainAccount, netIdx) =>
              fullChainAccount.accounts.map((acc, accIdx) => (
                <ChainCard
                  account={acc}
                  network={networks.find(
                    (net) => net.unit === fullChainAccount.symbol
                  )}
                  key={`card_logo_${netIdx.toString()}_${accIdx.toString()}`}
                  accountClicked={this.accountClicked}
                  renameAccount={this.props.renameAlias}
                />
              ))
            )}
          </div>
        </div>
        {/* <div className="footer" onClick={this.handleClose}>
          <img src={Close} alt="close" aria-hidden="true" width="20" />
          <span className="close">CLOSE</span>
        </div> */}
      </div>
    );
  }
}
