import React, { Component } from 'react';
import Footer from '../../common/footer';
import ButtonLG from '../../common/buttons/button-lg';

export default class TOUFooter extends Component {
  render() {
    const {
      buttonName, disabled, onClick, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <Footer>
          <ButtonLG disabled={disabled} onClick={onClick}>
            {buttonName}
          </ButtonLG>
        </Footer>
      </div>
    );
  }
}
