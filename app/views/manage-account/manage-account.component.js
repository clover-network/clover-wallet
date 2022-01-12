import React, { Component } from "react";
import { CREATE_ACCOUNT_PAGE } from "../../constants/navigation";
import "./styles.css";
import HeaderBack from "../../components/header-back";
import { getChainLogo } from "../../utils/chain";
import ChainCard from "../../components/chain-card";
import AddAccountIcon from "../../images/add_account_icon.svg";
export default class ManageAccount extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
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

  handleSubheaderBackBtn = () => {
    this.props.changePage(this.props.backupPage);
  };

  handleAddAccount = async () => {
    await this.props.addAccount();
    this.props.changePage(CREATE_ACCOUNT_PAGE);
  };

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
  accountClicked = async (account, network) => {
    // this.props.changeAccount(account);
    // console.log(account, this.props.account);
  };
  dotClick = async (account, network) => {};
  handleClose = () => {
    this.props.changePage(this.props.backupPage);
  };
  render() {
    const { fullChainAccounts, removeAccount, account } = this.props;
    const { chain, networks } = this.state;
    return (
      <div className="container">
        <HeaderBack
          handleBack={this.handleSubheaderBackBtn}
          title="SETTING"
          // style={{ textAlign: "left", marginLeft: "25px" }}
        />
        <div className="panel-container manage-account-list">
          <div className="left-panel" style={{ height: "415px" }}>
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
                  className="can-click"
                />
                <span
                  className={chain === nt.unit ? "split split-select" : "split"}
                />
              </React.Fragment>
            ))}
          </div>
          <div className="right-panel" style={{ height: "415px" }}>
            {fullChainAccounts.map((fullChainAccount, netIdx) =>
              fullChainAccount.accounts.map((acc, accIdx) => (
                <ChainCard
                  showDot={true}
                  account={acc}
                  currentAccount={account}
                  network={networks.find(
                    (net) => net.unit === fullChainAccount.symbol
                  )}
                  key={`card_logo_${netIdx.toString()}_${accIdx.toString()}`}
                  accountClicked={this.accountClicked}
                  removeAccount={removeAccount}
                />
              ))
            )}
          </div>
        </div>
        <div className="footer" onClick={this.handleAddAccount}>
          <img src={AddAccountIcon} alt="close" aria-hidden="true" width="14" />
          <span
            className="close"
            style={{ fontFamily: "Inter-Bold", fontSize: "15px" }}
          >
            ADD ACCOUNT
          </span>
        </div>
      </div>
    );
  }
}
