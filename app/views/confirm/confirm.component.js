import React, { Component } from 'react';
import ConfirmForm from '../../components/confirm/confirm-form';
import { TRANSFER_PAGE, CREATE_ADDRESS_BOOK_PAGE } from '../../constants/navigation';
import { shortenAddress } from '../../services/wallet-service';
import { findChainByName } from '../../../lib/constants/chain';
import ArrowLeft from '../../images/arrow_left.svg';
import HeaderBack from '../../components/header-back';

export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'SUBMIT',
    };
  }

  componentDidMount() {
    this.props.resetConfirmOnBoarding();
  }

  openAddressBook = () => {
    this.props.changePage(CREATE_ADDRESS_BOOK_PAGE);
  };

  handleSend = async () => {
    const { confirmDetails, submitTransaction, isNewAddress } = this.props;
    const tx = await submitTransaction(confirmDetails);
    const result = await isNewAddress(tx.metadata.to);
    if (result.isNewAddress === true) {
      this.props.updateToAddress(tx.metadata.to);
      this.props.createToast({
        message: `Transfer submitted with ${shortenAddress(tx.txnHash)}`,
        onClick: this.openAddressBook,
        type: 'addAddress',
        toastType: 'info',
        autoClose: false,
      });
    } else {
      this.props.createToast({
        message: `Transfer submitted with ${shortenAddress(tx.txnHash)}`,
        type: 'info',
      });
    }
  };

  handleSubheaderBackBtn = () => {
    this.props.changePage(TRANSFER_PAGE);
  };

  render() {
    const { buttonText } = this.state;
    const { confirmDetails, network } = this.props;
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    return (
      <div>
        <HeaderBack icon={ArrowLeft} handleBack={this.handleSubheaderBackBtn} title="SEND SUBMIT" />
        <ConfirmForm
          confirmDetails={confirmDetails}
          handleSend={this.handleSend}
          buttonText={buttonText}
          theme={theme}
        />
      </div>
    );
  }
}
