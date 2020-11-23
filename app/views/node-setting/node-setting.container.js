import { connect } from 'react-redux';
import NodeSetting from './node-setting.component';
import { updateNodes } from './actions';
import { createToast } from '../../constants/toast';
import { changePage, updateBackupPage } from '../../containers/actions';
import { switchNetwork } from '../../actions/network';

const mapStateToProps = state => ({
  backupPage: state.appStateReducer.backupPage,
  network: state.networkReducer.network,
  nodes: state.nodeReducer.nodes,
});

const mapDispatchToProps = {
  updateNodes,
  changePage,
  createToast,
  switchNetwork,
  updateBackupPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeSetting);
