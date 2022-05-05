import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import './styles.css';

class ButtonXL extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const { className, ...otherProps } = this.props;
    const buttonXLClassNames = classNames({
      'button-xl': true,
    });
    return (
      <div className={buttonXLClassNames}>
        <Button
          className={className}
          disabled={this.props.disabled}
          onClick={this.props.onClick}
          size="large" 
          variant="contained" 
          color="primary" 
          fullWidth={true}
          {...otherProps}
        >
          {this.props.children}
        </Button>
      </div>
    );
  }
}

export default ButtonXL;
