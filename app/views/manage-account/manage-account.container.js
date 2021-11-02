import { connect } from "react-redux";
import ManageAccount from "./manage-account.component";
import { changePage, updateAppLoading } from "../../containers/actions";
import { createToast } from "../../constants/toast";
import { addAccount, changeAccount, removeAccount } from "./actions";
import { switchNetwork } from "../../actions/network";

const mapStateToProps = (state) => ({
  account: state.accountReducer.account,
  accountMenu: state.dashboardReducer.accountMenu,
  accounts: state.accountReducer.accounts,
  network: state.networkReducer.network,
  networks: state.networkReducer.networks,
  fullChainAccounts: state.accountReducer.fullChainAccounts,
  backupPage: state.appStateReducer.backupPage,
});

const mapDispatchToProps = {
  changePage,
  createToast,
  addAccount,
  changeAccount,
  removeAccount,
  updateAppLoading,
  switchNetwork,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
