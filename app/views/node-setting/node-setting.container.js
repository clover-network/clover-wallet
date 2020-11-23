import { connect } from 'react-redux';
import NodeSetting from './node-setting.component';
import { updateNodes } from './actions';
import { createToast } from '../../constants/toast';
import { changePage, updateBackupPage } from '../../containers/actions';

const mapStateToProps = state => ({
  backupPage: state.appStateReducer.backupPage,
  network: state.networkReducer.network,
  nodes: state.nodeReducer.nodes,
});

const mapDispatchToProps = {
  updateNodes,
  changePage,
  createToast,
  updateBackupPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeSetting);
