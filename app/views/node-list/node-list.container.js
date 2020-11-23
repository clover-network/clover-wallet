import { connect } from 'react-redux';
import NodeList from './node-list.component';
import { changePage, updateBackupPage } from '../../containers/actions';
import { getNodes } from './actions';

const mapStateToProps = state => ({
  backupPage: state.appStateReducer.backupPage,
  network: state.networkReducer.network,
  page: state.appStateReducer.page,
  nodes: state.nodeReducer.nodes,
});

const mapDispatchToProps = {
  changePage,
  updateBackupPage,
  getNodes,
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeList);
