import React, { Component } from 'react';
import CloverInput from '../../common/clover-input';
import CreateAccountAdvancedConfig from '../create-account-advanced-config';
import './styles.css';

export default class CreateAccountSettings extends Component {
  render() {
    const {
      alias,
      handleAliasChange,
      aliasPropName,
      aliasLabel,
      keypairType,
      keypairTypes,
      onKeypairTypeChange,
      isAliasError,
      aliasErrorMessage,
      aliasInputName,
      aliasRef,
      handleAliasOnBlur,
      disableAccountSettings,
      ...otherProps
    } = this.props;
    this.aliasRef = aliasRef;
    return (
      <div {...otherProps}>
        <CloverInput
          className="account-alias-input"
          value={alias}
          onChange={handleAliasChange(aliasPropName)}
          label={aliasLabel}
          error={isAliasError}
          helperText={aliasErrorMessage}
          name={aliasInputName}
          inputRef={aliasRef}
          onBlur={handleAliasOnBlur}
          disabled={disableAccountSettings && !isAliasError}
        />
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
