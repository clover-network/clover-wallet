import React, { PureComponent } from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import CloverLoader from '../common/clover-loader';

export default class CloverContainer extends PureComponent {
  render() {
    const { children, blocking, ...otherProps } = this.props;
    return (
      <BlockUi tag="div" blocking={blocking} loader={<CloverLoader />} {...otherProps}>
        {children}
      </BlockUi>
    );
  }
}
