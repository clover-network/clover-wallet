import React, { Component } from 'react';
import SignIn from '../../views/sign-in';
import SignUp from '../../views/sign-up';
import CreateAccount from '../../views/create-account';
import CreateAddressBook from '../../views/create-address-book';
import Terms from '../../views/terms';
import Dashboard from '../../views/dashboard';
import Transfer from '../../views/transfer';
import Confirm from '../../views/confirm';
import TransferStatusPage from '../../views/transfer-status';
import LoaderOverlay from '../loader-overlay';
import Error from '../../views/error';
import CustomNetwork from '../../views/custom-network';
import QRCode from '../../views/qr-code';
import ManageAccount from '../../views/manage-account';
import AddressBook from '../../views/address-book';
import NodeList from '../../views/node-list';
import NodeSetting from '../../views/node-setting';
import About from '../../views/about';
import ConnectRequest from '../../views/connect-request';
import DAppRequests from '../../views/dapp-requests';
import DAppWeb3Requests from '../../views/dapp-web3-requests';
import Chain from '../../views/chain';
import Trade from '../../views/trade';
import AddToken from '../../views/addToken';
import * as NavConstant from '../../constants/navigation';
import Settings from '../../views/settings';
import EntryPage from '../../views/entry-page';
import ImportWallet from '../../views/import-wallet';

const getView = page => {
  switch (page) {
    case NavConstant.ENTRY_PAGE:
      return <EntryPage />;
    case NavConstant.IMPORT_WALLET_PAGE:
      return <ImportWallet />;
    case NavConstant.TERMS_PAGE:
      return <Terms />;
    case NavConstant.DASHBOARD_PAGE:
      return <Dashboard />;
    case NavConstant.CHAIN_PAGE:
      return <Chain />;
    case NavConstant.SETTINGS_PAGE:
      return <Settings />;
    case NavConstant.TRADE_PAGE:
      return <Trade />;
    case NavConstant.ADD_TOKEN_PAGE:
      return <AddToken />;
    case NavConstant.LOADER_OVERLAY:
      return <LoaderOverlay />;
    case NavConstant.SIGN_IN_PAGE:
      return <SignIn />;
    case NavConstant.SIGN_UP_PAGE:
      return <SignUp />;
    case NavConstant.CREATE_ACCOUNT_PAGE:
      return <CreateAccount />;
    case NavConstant.CREATE_ADDRESS_BOOK_PAGE:
      return <CreateAddressBook />;
    case NavConstant.TRANSFER_PAGE:
      return <Transfer />;
    case NavConstant.CONFIRM_PAGE:
      return <Confirm />;
    case NavConstant.TRANSFER_STATUS_PAGE:
      return <TransferStatusPage />;
    case NavConstant.ERROR_PAGE:
      return <Error />;
    case NavConstant.CUSTOM_NETWORK_PAGE:
      return <CustomNetwork />;
    case NavConstant.QR_CODE_PAGE:
      return <QRCode />;
    case NavConstant.ABOUT_PAGE:
      return <About />;
    case NavConstant.CONNECT_REQUEST_PAGE:
      return <ConnectRequest />;
    case NavConstant.DAPP_REQUESTS_PAGE:
      return <DAppRequests />;
    case NavConstant.DAPP_WEB3_REQUESTS_PAGE:
      return <DAppWeb3Requests />;
    case NavConstant.MANAGE_ACCOUNT_PAGE:
      return <ManageAccount />;
    case NavConstant.ADDRESS_BOOK_PAGE:
      return <AddressBook />;
    case NavConstant.NODE_SETTING_PAGE:
      return <NodeSetting />;
    case NavConstant.NODE_LIST_PAGE:
      return <NodeList />;
    default:
      return <Dashboard />;
  }
};

export default class ViewSelector extends Component {
  render() {
    const { page, ...otherProps } = this.props;
    return <div {...otherProps}>{getView(page)}</div>;
  }
}
