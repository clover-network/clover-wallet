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
          width="155px"
          className="button-sm-primary"
        >
          {backButtonName}
        </ButtonCustom>
        <ButtonCustom
          onClick={onNextClick}
          width="155px"
          className="button-sm-primary"
        >
          {nextButtonName}
        </ButtonCustom>
      </div>
    );
  }
}
