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
      height: ${this.props.height ? this.props.height : "auto"};
    `;
    return (
      <div className={className}>
        <ButtonCustomDom
          disabled={this.props.disabled}
          onClick={this.props.onClick}
          fullwidth
          {...otherProps}
        >
          {this.props.children}
        </ButtonCustomDom>
      </div>
    );
  }
}

export default ButtonCustom;
