import React, { Component } from 'react';
import CloverInput from '../../common/clover-input';
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
        <CloverInput
          value={url}
          onChange={onChange}
          label="Custom URL"
          className="url-field"
          name={name}
          helperText={urlInvalidMessage}
          error={!isURLValid}
          inputRef={urlRef}
        />
        <FooterButton onClick={onSave} name="save" />
      </div>
    );
  }
}
