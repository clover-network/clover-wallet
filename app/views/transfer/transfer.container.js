import { connect } from 'react-redux';
import Transfer from './transfer.component';
import { changePage, updateAppLoading, updateBackupPage } from '../../containers/actions';
import { updateToAddress } from '../../actions/address-book';
import { selectToken } from '../../actions/account';
import {
  clearTransferDetails,
  confirmTransaction,
  resetConfirmOnBoarding,
  dispatchSetTransferDetails,
} from './actions';

const mapStateToProps = state => ({
  account: state.accountReducer.account,
  balance: state.accountReducer.balance,
  selectedToken: state.accountReducer.selectedToken,
  confirmDetails: state.transferReducer.confirmDetails,
  unit: state.networkReducer.unit,
  units: state.networkReducer.units,
  success: state.transferReducer.success,
  error: state.transferReducer.error,
  isToAddressError: state.transferReducer.isToAddressError,
  toAddressErrorMessage: state.transferReducer.toAddressErrorMessage,
  isAmountError: state.transferReducer.isAmountError,
  toAmountErrorMessage: state.transferReducer.toAmountErrorMessage,
  page: state.appStateReducer.page,
  toAddress: state.addressBookReducer.toAddress,
  network: state.networkReducer.network,
  addressBook: state.addressBookReducer.addressBook,
});

const mapDispatchToProps = {
  changePage,
  updateBackupPage,
  clearTransferDetails,
  confirmTransaction,
  updateAppLoading,
  resetConfirmOnBoarding,
  dispatchSetTransferDetails,
  updateToAddress,
  selectToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
