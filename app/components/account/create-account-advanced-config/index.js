import React, { Component } from 'react';
import FusoExpansionPanel from '../../common/expansion-panel';
import RadioButtonGroup from '../../common/radio-button-group';
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
        <FusoExpansionPanel disabled={disableAccountSettings} title="Advanced">
          <FontRegular
            text="Keypair Crypto Type"
            style={{
              fontSize: 13,
              margin: '14px 0px 14px 0px',
            }}
          />
          <RadioButtonGroup
            options={keypairTypes}
            value={keypairType}
            onChange={onKeypairTypeChange}
            disabled={disableAccountSettings}
          />
        </FusoExpansionPanel>
      </div>
    );
  }
}
