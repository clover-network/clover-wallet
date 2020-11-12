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
      lname,
      lnameLabel,
      lnamePropName,
      lnameInputRef,
      isLnameError,
      handleLnameChange,
      handleLnameOnBlur,
      onSubmit,
      buttonName,
    } = this.props;
    return (
      <div className="create-address-book-form">
        <CloverInput
          placeholderText="Input or paste address here"
          style={{ background: 'rgba(65, 72, 93, 0.1)', border: 'none' }}
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
          style={{ background: 'rgba(65, 72, 93, 0.1)', border: 'none' }}
          className="contact-fname-input"
          value={fname}
          onChange={handleFnameChange(fnamePropName)}
          label={fnameLabel}
          error={isFnameError}
          name={fnamePropName}
          inputRef={fnameInputRef}
          onBlur={handleFnameOnBlur}
        />
        <CloverInput
          className="contact-lname-input"
          value={lname}
          onChange={handleLnameChange(lnamePropName)}
          label={lnameLabel}
          error={isLnameError}
          name={lnamePropName}
          inputRef={lnameInputRef}
          onBlur={handleLnameOnBlur}
        />
        <FooterButton onClick={onSubmit} name={buttonName} />
      </div>
    );
  }
}
