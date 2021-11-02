import React, { Component } from 'react';
import FusoInput from '../../common/input';
import FooterButton from '../../common/footer-button';
import './styles.css';

export default class CustomNetworkForm extends Component {
  render() {
    const {
      onSave,
      url,
      onChange,
      name,
      isURLValid,
      urlInvalidMessage,
      urlRef,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <FusoInput
          value={url}
          onChange={onChange}
          label="Custom URL"
          className="url-field"
          name={name}
          error={!isURLValid}
          inputRef={urlRef}
        />
        <FooterButton onClick={onSave} name="save" />
      </div>
    );
  }
}
