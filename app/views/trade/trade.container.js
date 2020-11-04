import { connect } from 'react-redux';
import { changePage } from '../../containers/actions';
import Trade from './trade.component';
import { resetToAddress } from '../../actions/address-book';
import { getUnits } from '../../actions/network';
import { connectionError } from '../dashboard/actions';

const mapStateToProps = state => ({
  isLoading: state.appStateReducer.isLoading,
  network: state.networkReducer.network,
  accounts: state.accountReducer.accounts,
  account: state.accountReducer.account,
  balances: state.accountReducer.balances,
  balance: state.accountReducer.balance,
  selectedToken: state.accountReducer.selectedToken,
  backupPage: state.appStateReducer.backupPage,
  transactions: state.dashboardReducer.transactions,
  isConnected: state.networkReducer.isConnected,
});

const mapDispatchToProps = {
  changePage,
  resetToAddress,
  getUnits,
  connectionError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
