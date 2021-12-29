import { connect } from 'react-redux';
import AddToken from './addtoken.component';
import { changePage,updateAppLoading } from '../../containers/actions';
import { createToast } from '../../constants/toast';
import { resetToAddress } from '../../actions/address-book';
import { getUnits } from '../../actions/network';
import { selectToken } from '../../actions/account';

const mapStateToProps = state => ({
  accounts: state.accountReducer.accounts,
  account: state.accountReducer.account,
  balances: state.accountReducer.balances,
  balance: state.accountReducer.balance,
  isLinkToFaucet: state.accountReducer.isLinkToFaucet,
  transactions: state.dashboardReducer.transactions,
  network: state.networkReducer.network,
  unit: state.networkReducer.unit,
  isConnected: state.networkReducer.isConnected,
  accountMenu: state.dashboardReducer.accountMenu,
});

const mapDispatchToProps = {
  changePage,
  updateAppLoading,
  createToast,
  resetToAddress,
  getUnits,
  selectToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToken);
