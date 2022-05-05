import React, { Component } from "react";
import FusoInput from "../../common/input";
import FooterButton from "../../common/footer-button";
import "./styles.css";

export default class CreateContactForm extends Component {
  render() {
    const {
      address,
      isAddressError,
      addressPropName,
      addressInputRef,
      handleToChange,
      fname,
      fnameLabel,
      isFnameError,
      fnamePropName,
      handleFnameChange,
      handleFnameOnBlur,
      fnameInputRef,
      onSubmit,
      buttonName,
    } = this.props;
    return (
      <div className="create-address-book-form">
        <FusoInput
          className="sign-up-password"
          placeholderText="Input or paste address here"
          value={address}
          error={isAddressError}
          name={addressPropName}
          onChange={handleToChange(addressPropName)}
          inputRef={addressInputRef}
          spellCheck={false}
        />
        <FusoInput
          placeholderText="Firstname"
          className="sign-up-password contact-fname-input"
          value={fname}
          onChange={handleFnameChange(fnamePropName)}
          error={isFnameError}
          name={fnamePropName}
          inputRef={fnameInputRef}
          onBlur={handleFnameOnBlur}
        />
        <FooterButton onClick={onSubmit} name={buttonName} />
      </div>
    );
  }
}
