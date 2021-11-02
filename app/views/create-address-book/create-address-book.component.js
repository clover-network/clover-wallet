import React, { PureComponent } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DarkDivider from "../../components/common/divider/dark-divider";
import CreateContactForm from "../../components/address-book/create-contact-form";
import FusoValidator from "../../utils/fuso-validator";
import { DASHBOARD_PAGE } from "../../constants/navigation";
import validator from "../../utils/fuso-validator/validator";
import "./styles.css";
import { findChainByName } from "../../../lib/constants/chain";
import HeaderBack from "../../components/header-back";
import SelectDown from "../../images/select_down_icon.svg";
import ArrowRight from "../../images/arrow_right.svg";
import { getChainLogo } from "../../utils/chain";

const FnameRequiredErrorMessage = "Firstname required";
const AddressRequiredErrorMessage = "Address required";

export default class CreateAddressBook extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      address: props.toAddress,
      isAddressError: false,
      addressErrorMessage: "",
      addressPropName: "address",
      fnamePropName: "fname",
      fname: "",
      fnameLabel: "Firstname",
      isFnameError: false,
      fnameErrorMessage: "",
      lnamePropName: "lname",
      lname: "",
      lnameLabel: "Lastname",
      buttonText: "ADD",
      network: props.network,
      showCurrencySelect: false,
    };
    this.lnameValidator = new FusoValidator(validator.lnameValidation);
    this.fnameValidator = new FusoValidator(validator.fnameValidation);
    this.addressInputRef = React.createRef();
    this.fnameInputRef = React.createRef();
    this.lnameInputRef = React.createRef();
  }

  onSubmit = () => {
    const { address, fname, lname, network } = this.state;
    const { isFnameError, fnameErrorMessage } = this.validateFname(fname);
    this.setState({
      isFnameError,
      fnameErrorMessage,
    });
    const { isLnameError, lnameErrorMessage } = this.validateLname(lname);
    this.setState({
      isLnameError,
      lnameErrorMessage,
    });
    const { isAddressError, addressErrorMessage } =
      this.validateAddress(address);
    this.setState({
      isAddressError,
      addressErrorMessage,
    });
    if (!isFnameError && !isAddressError && !isLnameError) {
      this.props.submitContact({
        address,
        fname,
        lname,
        network,
      });
    }
  };

  handleAddressOnBlur = () => {
    const { address } = this.state;
    const { isAddressError, addressErrorMessage } =
      this.validateAddress(address);
    this.setState({
      isAddressError,
      addressErrorMessage,
    });
  };

  handleFnameOnBlur = () => {
    const { isFnameError, fnameErrorMessage } = this.validateFname(
      this.state.fname
    );
    if (this.state.fname !== "" || !isFnameError) {
      this.setState({
        isFnameError,
        fnameErrorMessage,
      });
    }
  };

  handleLnameOnBlur = () => {
    const { isLnameError, lnameErrorMessage } = this.validateLname(
      this.state.lname
    );
    if (this.state.lname !== "" || !isLnameError) {
      this.setState({
        isLnameError,
        lnameErrorMessage,
      });
    }
  };

  handleSubheaderBackBtn = () => {
    this.props.changePage(DASHBOARD_PAGE);
  };

  handleInputChange = (prop) => (e) => {
    this.setState({
      [prop]: e.target.value,
    });
  };

  handleNetworkChange = (nt) => () => {
    this.setState({ network: nt });
  };

  toggleDrawer = (status) => () => {
    this.setState({ showCurrencySelect: status });
  };

  validateAddress(address) {
    let { isAddressError, addressErrorMessage } = this.state;
    if (address.length === 0) {
      isAddressError = true;
      addressErrorMessage = AddressRequiredErrorMessage;
    } else {
      isAddressError = false;
      addressErrorMessage = "";
    }
    return {
      isAddressError,
      addressErrorMessage,
    };
  }

  validateFname(fname) {
    let { isFnameError, fnameErrorMessage } = this.state;
    if (fname.length === 0) {
      isFnameError = true;
      fnameErrorMessage = FnameRequiredErrorMessage;
    } else if (fname !== "") {
      const fnameValidation = this.fnameValidator.validate({
        fname,
      });
      if (!fnameValidation.isValid) {
        isFnameError = true;
        fnameErrorMessage = fnameValidation.fname.message;
      } else {
        isFnameError = false;
        fnameErrorMessage = null;
      }
    } else {
      isFnameError = false;
      fnameErrorMessage = null;
    }
    return {
      isFnameError,
      fnameErrorMessage,
    };
  }

  validateLname(lname) {
    let { isLnameError, lnameErrorMessage } = this.state;

    if (lname !== "") {
      const lnameValidation = this.lnameValidator.validate({
        lname,
      });
      if (!lnameValidation.isValid) {
        isLnameError = true;
        lnameErrorMessage = lnameValidation.lname.message;
      } else {
        isLnameError = false;
        lnameErrorMessage = null;
      }
    }
    return {
      isLnameError,
      lnameErrorMessage,
    };
  }

  render() {
    const {
      address,
      isAddressError,
      addressPropName,
      addressErrorMessage,
      fname,
      fnameLabel,
      fnamePropName,
      isFnameError,
      fnameErrorMessage,
      lname,
      lnameLabel,
      lnamePropName,
      isLnameError,
      lnameErrorMessage,
      buttonText,
      network,
      showCurrencySelect,
    } = this.state;
    const { networks } = this.props;
    const chain = findChainByName(this.props.network.value);
    const theme = chain.icon || "polkadot";
    return (
      <div>
        <HeaderBack
          handleBack={this.handleSubheaderBackBtn}
          title="CONTACT"
          style={{ textAlign: "left", marginLeft: "25px" }}
        />
        <div className="create-address-book-form">
          <div
            className="create-address-select-item-wrapper"
            onClick={this.toggleDrawer(true)}
          >
            <div className="create-address-select-item-left">
              <img
                className="create-address-select-item-icon"
                width="26"
                height="26"
                src={getChainLogo(network.unit, true)}
                alt=""
              />
              <span className="create-address-select-item-currency-type">
                {network.text}
              </span>
            </div>
            <img
              className="create-address-select-down-icon"
              width="9"
              height="6"
              src={SelectDown}
              alt=""
            />
          </div>
          <React.Fragment>
            <Drawer
              anchor="bottom"
              open={showCurrencySelect}
              onClose={this.toggleDrawer(false)}
            >
              <div
                className="select-asset-wrapper"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
              >
                <div className="select-asset-title">select Chains</div>
                <List>
                  {networks.map((nt, index) => (
                    <div key={index.toString()}>
                      <DarkDivider />
                      <ListItem
                        button
                        key={`create-address_${index.toString()}`}
                        onClick={this.handleNetworkChange(nt)}
                      >
                        <div className="select-asset-item-left">
                          <img
                            className="select-asset-item-icon"
                            width="28"
                            height="28"
                            src={getChainLogo(nt.unit, true)}
                            alt=""
                          />
                          <span className="select-asset-item-currency-type">
                            {nt.text}
                          </span>
                        </div>
                        <img
                          className="create-address-arrow-right-icon"
                          width="9"
                          height="6"
                          src={ArrowRight}
                          alt=""
                        />
                      </ListItem>
                    </div>
                  ))}
                </List>
              </div>
            </Drawer>
          </React.Fragment>
        </div>
        <CreateContactForm
          className="create-address-book-form"
          address={address}
          theme={theme}
          isAddressError={isAddressError}
          addressPropName={addressPropName}
          addressErrorMessage={addressErrorMessage}
          addressInputRef={(input) => {
            this.addressInputRef = input;
          }}
          handleToChange={this.handleInputChange}
          fname={fname}
          fnameLabel={fnameLabel}
          fnamePropName={fnamePropName}
          isFnameError={isFnameError}
          fnameErrorMessage={fnameErrorMessage}
          fnameInputRef={(input) => {
            this.fnameInputRef = input;
          }}
          handleFnameChange={this.handleInputChange}
          handleFnameOnBlur={this.handleFnameOnBlur}
          lname={lname}
          lnameLabel={lnameLabel}
          lnamePropName={lnamePropName}
          isLnameError={isLnameError}
          lnameErrorMessage={lnameErrorMessage}
          lnameInputRef={(input) => {
            this.lnameInputRef = input;
          }}
          handleLnameChange={this.handleInputChange}
          handleLnameOnBlur={this.handleLnameOnBlur}
          buttonName={buttonText}
          onSubmit={this.onSubmit}
          networks={networks}
          network={network}
          onNetworkChange={this.handelNetworkChnage}
        />
      </div>
    );
  }
}
