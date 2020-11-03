import { connect } from 'react-redux';
import { changePage } from '../../containers/actions';
import Trade from './trade.component';

const mapStateToProps = state => ({
  isLoading: state.appStateReducer.isLoading,
  network: state.networkReducer.network,
  accounts: state.accountReducer.accounts,
  account: state.accountReducer.account,
  balances: state.accountReducer.balances,
  balance: state.accountReducer.balance,
  selectedToken: state.accountReducer.selectedToken,
  backupPage: state.appStateReducer.backupPage,
});

const mapDispatchToProps = {
  changePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
