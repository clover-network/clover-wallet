import React, { Component } from "react";
import { IsEmpty } from "react-lodash";
import { getChainCardStyle } from "../../utils/chain";
import { shortenAddress } from "../../services/wallet-service";
import { MoreVert } from "@material-ui/icons";
import { Popover } from "@material-ui/core";
import classnames from "classnames";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core/";
import keyring from "@polkadot/ui-keyring";
import "./styles.less";
export default class ChainCard extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      open: false,
    };
  }
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  handleConfirmClose = () => {
    this.setState({
      open: false,
      anchorEl: null,
    });
  };
  handleDeleteAccount = async () => {
    let { currentAccount, account, removeAccount } = this.props;
    if (currentAccount.alias !== account.alias) {
      await removeAccount(account);
      this.handleConfirmClose();
    }
  };
  handleAccountOption = (action) => {
    let { currentAccount, account } = this.props;
    switch (action) {
      case "forget":
        if (currentAccount.alias === account.alias) {
          return;
        }
        this.setState({ open: true });
        break;
      case "rename":

        break;
      case "export":
        keyring.backupAccount(keyring.getPair(account.address), password);
      default:
        return;
    }
  };
  render() {
    const {
      account,
      currentAccount,
      network,
      accountClicked,
      showDot = false,
    } = this.props;
    const classes = classnames({
      disabled: currentAccount && account.alias === currentAccount.alias,
    });
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
              <Popover
                open={!!this.state.anchorEl}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <ul className="account-options">
                  <li onClick={() => {
                      this.handleAccountOption("rename");
                    }}>Rename</li>
                  <li
                    onClick={() => {
                      this.handleAccountOption("export");
                    }}
                  >
                    Export Account
                  </li>
                  <li
                    className={classes}
                    onClick={() => {
                      this.handleAccountOption("forget");
                    }}
                  >
                    Forget Account
                  </li>
                </ul>
              </Popover>
              <Dialog
                open={this.state.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Forget this account ?"}
                </DialogTitle>
                <DialogActions>
                  <Button
                    onClick={this.handleConfirmClose}
                    variant="outlined" 
                    color="secondary"
                    size="small"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={this.handleDeleteAccount}
                    color="secondary"
                    variant="contained"
                    size="small"
                    autoFocus
                  >
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
              {showDot ? (
                <MoreVert
                  style={{ color: "#fff" }}
                  onClick={this.handleClick}
                />
              ) : null}
            </div>
          );
        }}
      />
    );
  }
}
