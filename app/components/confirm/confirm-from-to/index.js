import React, { Component } from 'react';
import TransferFrom from '../../transfer/transfer-from';
import ConfirmTo from '../confirm-to';
import TranferFromTo from '../../../images/tranfer_from_to.svg';

export default class ConfirmFromTo extends Component {
  render() {
    const {
      to, alias, from, theme, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <TransferFrom address={from} alias={alias} theme={theme} />
        <img
          style={{
            marginLeft: '43px',
            marginTop: '5px',
          }}
          width="10"
          height="14"
          src={TranferFromTo}
          alt=""
        />
        <ConfirmTo
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: '26px',
            height: '54.8px',
          }}
          address={to}
          theme={theme}
        />
      </div>
    );
  }
}
