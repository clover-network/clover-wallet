import React, { Component } from 'react';
import CloverExpansionPanel from '../../common/clover-expansion-panel';
import CloverRadioButtonGroup from '../../common/clover-radio-button-group';
import FontRegular from '../../common/fonts/font-regular';

export default class CreateAccountAdvancedConfig extends Component {
  render() {
    const {
      classes,
      keypairType,
      keypairTypes,
      onKeypairTypeChange,
      disableAccountSettings,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <CloverExpansionPanel disabled={disableAccountSettings} title="Advanced">
          <FontRegular
            text="Keypair Crypto Type"
            style={{
              fontSize: 13,
              margin: '14px 0px 14px 0px',
            }}
          />
          <CloverRadioButtonGroup
            options={keypairTypes}
            value={keypairType}
            onChange={onKeypairTypeChange}
            disabled={disableAccountSettings}
          />
        </CloverExpansionPanel>
      </div>
    );
  }
}
