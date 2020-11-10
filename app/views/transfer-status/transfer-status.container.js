import { connect } from 'react-redux';
import { changePage } from '../../containers/actions';
import TransferStatus from './transfer-status.component';

const mapStateToProps = state => ({
  isLoading: state.appStateReducer.isLoading,
  networks: state.networkReducer.networks,
  network: state.networkReducer.network,
  accounts: state.accountReducer.accounts,
  fullChainAccounts: state.accountReducer.fullChainAccounts,
  account: state.accountReducer.account,
  backupPage: state.appStateReducer.backupPage,
  selectedToken: state.accountReducer.selectedToken,
  selectedTransaction: state.dashboardReducer.selectedTransaction,
});

const mapDispatchToProps = {
  changePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferStatus);
