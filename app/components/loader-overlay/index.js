import React, { Component } from 'react';
import BlockUi from 'react-block-ui';
import './styles.css';
import FusoLoader from '../common/loader';

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
        <BlockUi tag="div" blocking={isLoading} loader={<FusoLoader />}>
          <div className="wallet-loader-page" />
        </BlockUi>
      </div>
    );
  }
}
