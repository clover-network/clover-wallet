import { connect } from 'react-redux';
import { changePage, updateAppLoading } from '../../containers/actions';
import Chain from './chain.component';
import { switchNetwork } from '../../actions/network';
import { changeAccount } from '../manage-account/actions';
import { createToast } from '../../constants/toast';

const mapStateToProps = state => ({
  isLoading: state.appStateReducer.isLoading,
  networks: state.networkReducer.networks,
  network: state.networkReducer.network,
  accounts: state.accountReducer.accounts,
  fullChainAccounts: state.accountReducer.fullChainAccounts,
  account: state.accountReducer.account,
  backupPage: state.appStateReducer.backupPage,
});

const mapDispatchToProps = {
  changePage,
  switchNetwork,
  changeAccount,
  createToast,
  updateAppLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chain);
