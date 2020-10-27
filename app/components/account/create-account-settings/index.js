import React, { Component } from 'react';
import CreateAccountAdvancedConfig from '../create-account-advanced-config';
import './styles.css';

export default class CreateAccountSettings extends Component {
  render() {
    const {
      keypairType,
      keypairTypes,
      onKeypairTypeChange,
      disableAccountSettings,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <CreateAccountAdvancedConfig
          keypairType={keypairType}
          keypairTypes={keypairTypes}
          onKeypairTypeChange={onKeypairTypeChange}
          className="create-account-advanced-config"
          disableAccountSettings={disableAccountSettings}
        />
      </div>
    );
  }
}
