import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

class ButtonCustom extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const { className, ...otherProps } = this.props;
    const ButtonCustomDom = styled(Button)`
      font-size: 14px;
      font-family: "Inter-Bold";
      font-style: normal;
      color: ${this.props.color ? this.props.color : "#F23E5F"};
      border: ${this.props.border ? this.props.border : "none"};
      width: 100% !important;
    `;
    return (
      <div className={className} style={{width: this.props.width ? this.props.width : "45%"}}>
        <ButtonCustomDom
          disabled={this.props.disabled}
          onClick={this.props.onClick}
          {...otherProps}
        >
          {this.props.children}
        </ButtonCustomDom>
      </div>
    );
  }
}

export default ButtonCustom;
