import React, { Component } from 'react';
import BlockUi from 'react-block-ui';
import './styles.css';
import CloverLoader from '../common/clover-loader';

export default class LoaderOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    const {
      state: { isLoading },
    } = this;

    return (
      <div>
        <BlockUi tag="div" blocking={isLoading} loader={<CloverLoader />}>
          <div className="wallet-loader-page" />
        </BlockUi>
      </div>
    );
  }
}
