import React, { Component } from "react";
import { IsEmpty } from "react-lodash";
import { getChainCardStyle } from "../../utils/chain";
import { shortenAddress } from "../../services/wallet-service";
import { MoreVert } from "@material-ui/icons";
import { Popover } from "@material-ui/core";
import classnames from "classnames";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core/";
import keyring from "@polkadot/ui-keyring";
import "./styles.css";
import EditIcon from '../../images/edit.svg';
import OutlinedInput from '@material-ui/core/OutlinedInput';


export default class ChainCard extends Component {
  constructor() {
    super();
    this.textInput = React.createRef();
    this.state = {
      anchorEl: null,
      open: false,
      editMode: false,
      editValue: ''
    };
  }

  componentDidMount() {
    const {account} = this.props;
    this.setState({
      ...this.state,
      editValue: account.alias
    })
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
        this.setState({editMode: true})
        this.textInput.current.focus();
        this.textInput.current.maxLength = 20;
        break;
      case "export":
        keyring.backupAccount(keyring.getPair(account.address), password);
      default:
        return;
    }
  };
  onAliasChange = (e) => {
    e.stopPropagation();
    this.setState({...this.state, editValue: e.target.value})
  }
  resetAlias = (e) => {
    e.stopPropagation();
    this.setState({editMode: true})
    this.textInput.current.focus();
    this.textInput.current.maxLength = 20;
  } 
  onAliasInputBlur = (e) => {
    e.stopPropagation();
    const {account} = this.props;
    if(this.state.editValue.length){
      this.props.renameAccount({...account, editAlias: this.state.editValue})
    }
    this.setState({...this.state, editMode: false})
  }
  onKeyPress = (e) => {
    e.stopPropagation();
    if(e.key === 'Enter') {
      this.onAliasInputBlur(e)
    }
  }
  render() {
    const {
      account,
      currentAccount,
      network,
      accountClicked,
      showDot = false,
      inputRef
    } = this.props;

    const classes = classnames({
      disabled: currentAccount && account.alias === currentAccount.alias,
    });
    const {editMode, editValue} = this.state;
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
                <div className="account-name" onClick={(e) => e.stopPropagation()}>
                  {!editMode ? (
                    <>
                      {account.alias} <img src={EditIcon} alt="rename" width="16" onClick={this.resetAlias}/>
                    </>
                  ):(
                    <OutlinedInput
                      inputRef={inputRef}
                      value={editValue}
                      onBlur={this.onAliasInputBlur}
                      onChange={this.onAliasChange}
                      classes={{
                        root: 'card-input-root',
                        input: 'card-input',
                        focused: 'card-input-focused',
                        notchedOutline: 'card-input-focused',
                      }}
                      onKeyPress={this.onKeyPress}
                    />
                  )}
                </div>
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
