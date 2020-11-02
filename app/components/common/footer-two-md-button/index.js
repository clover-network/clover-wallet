import React, { Component } from 'react';
import './styles.css';
import ButtonCustom from '../buttons/button-custom';

export default class FooterTwoMDButton extends Component {
  render() {
    const {
      style,
      namePrimary,
      nameSecondary,
      onClickPrimary,
      onClickSecondary,
      ...otherProps
    } = this.props;
    return (
      <div className="footer-two-button-container" style={style} {...otherProps}>
        <ButtonCustom onClick={onClickPrimary} width="155px" color="#41485D" background="white">
          {namePrimary}
        </ButtonCustom>
        <ButtonCustom onClick={onClickSecondary} width="155px">
          {nameSecondary}
        </ButtonCustom>
        {/*<ButtonMD color="#000000" onClick={onClickPrimary}>*/}
        {/*  {namePrimary}*/}
        {/*</ButtonMD>*/}
        {/*<ButtonMD color="#FB822A" onClick={onClickSecondary}>*/}
        {/*  {nameSecondary}*/}
        {/*</ButtonMD>*/}
      </div>
    );
  }
}
