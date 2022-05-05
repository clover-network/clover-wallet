import React, { PureComponent } from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import FusoLoader from '../common/loader';

export default class FusoContainer extends PureComponent {
  render() {
    const { children, blocking, ...otherProps } = this.props;
    return (
      <BlockUi tag="div" blocking={blocking} loader={<FusoLoader />} {...otherProps}>
        {children}
      </BlockUi>
    );
  }
}
