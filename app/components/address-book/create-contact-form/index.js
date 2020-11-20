import React, { Component } from 'react';
import CloverInput from '../../common/clover-input';
import FooterButton from '../../common/footer-button';
import './styles.css';

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
        <CloverInput
          className="sign-up-password"
          placeholderText="Input or paste address here"
          value={address}
          error={isAddressError}
          label="Address"
          name={addressPropName}
          onChange={handleToChange(addressPropName)}
          inputRef={addressInputRef}
          spellCheck={false}
        />
        <CloverInput
          placeholderText="Firstname"
          className="sign-up-password contact-fname-input"
          value={fname}
          onChange={handleFnameChange(fnamePropName)}
          label={fnameLabel}
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
