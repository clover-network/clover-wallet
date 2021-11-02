import React, { Component } from "react";
import "./styles.css";
import Logo from "../../images/logo.svg";
import FusoLogo from "../../images/fusotao.svg";
import Splash from "../../images/splash.svg";
import FusoBanner from "../../images/fuso_banner.svg";
import EntryImg from "../../images/entry_img.svg";
import EntryArrow from "../../images/entry_arrow.svg";
import {
  CREATE_ACCOUNT_PAGE,
  IMPORT_WALLET_PAGE,
} from "../../constants/navigation";

export default class EntryPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showPage: 1,
    };
  }

  componentDidMount() {
    const that = this;
    setTimeout(() => {
      that.setState({ showPage: 2 });
      setTimeout(() => {
        that.setState({ showPage: 3 });
      }, 3000);
    }, 2000);
  }

  handleCreateWallet = () => {
    // console.log('create ============');
    this.props.changePage(CREATE_ACCOUNT_PAGE);
  };

  handleImportWallet = () => {
    // console.log('import ------------');
    this.props.changePage(IMPORT_WALLET_PAGE);
  };

  render() {
    const { showPage } = this.state;
    return (
      <div className="entry-page-container">
        <div className={showPage === 1 ? "launch-container" : "hide-container"}>
          <img height={72} width={72} src={Logo} alt="" />
          <img
            height={22}
            width={122}
            style={{ marginTop: "20px" }}
            src={FusoLogo}
            alt=""
          />
        </div>
        <div className={showPage === 2 ? "splash-container" : "hide-container"}>
          <img className="full-width" height={476} src={Splash} alt="" />
          <img
            className="fuso-banner-img"
            height={26}
            width={85}
            src={FusoBanner}
            alt=""
          />
        </div>
        <div className={showPage === 3 ? "entry-container" : "hide-container"}>
          <img className="full-width" src={EntryImg} alt="" />
          <div className="entry-content">
            <div className="entry-item" onClick={this.handleCreateWallet}>
              <div>
                <span>Create A New Wallet.</span>
                <span>CREATE ACCOUNT</span>
              </div>
              <div>
                <img width={38} height={38} src={EntryArrow} alt="" />
              </div>
            </div>
            <div className="entry-item" onClick={this.handleImportWallet}>
              <div>
                <span>Import A Wallet.</span>
                <span>IMPORT ACCOUNT</span>
              </div>
              <div>
                <img width={38} height={38} src={EntryArrow} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
