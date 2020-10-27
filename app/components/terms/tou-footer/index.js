import React, { Component } from 'react';
import Footer from '../../common/footer';
import ButtonXL from '../../common/buttons/button-xl';

export default class TOUFooter extends Component {
  render() {
    const {
      buttonName, disabled, onClick, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <Footer>
          <ButtonXL disabled={disabled} onClick={onClick}>
            {buttonName}
          </ButtonXL>
        </Footer>
      </div>
    );
  }
}
