import React, { Component } from "react";
import ButtonCustom from "../buttons/button-custom";

export default class FooterWithTwoButton extends Component {
  render() {
    const {
      style,
      backButtonName,
      nextButtonName,
      onBackClick,
      onNextClick,
      ...otherProps
    } = this.props;
    return (
      <div
        style={{
          position: "absolute",
          bottom: "11px",
          right: "20px",
          left: "20px",
          justifyContent: "space-between",
          display: "flex",
          ...style,
        }}
        {...otherProps}
      >
        <ButtonCustom
          onClick={onBackClick}
          className="button-sm-primary"
          width="150px"
          height="48px"
          border="1px solid #F23E5F"
        >
          {backButtonName}
        </ButtonCustom>
        <ButtonCustom
          onClick={onNextClick}
          className="button-sm-secondary"
        >
          {nextButtonName}
        </ButtonCustom>
      </div>
    );
  }
}
