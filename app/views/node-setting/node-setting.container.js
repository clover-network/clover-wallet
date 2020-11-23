import { connect } from 'react-redux';
import NodeSetting from './node-setting.component';
import { submitNode } from './actions';
import { changePage, updateBackupPage } from '../../containers/actions';

const mapStateToProps = state => ({
  backupPage: state.appStateReducer.backupPage,
  network: state.networkReducer.network,
  nodes: state.nodeReducer.nodes,
});

const mapDispatchToProps = {
  submitNode,
  changePage,
  updateBackupPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeSetting);
