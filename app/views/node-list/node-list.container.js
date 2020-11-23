import { connect } from 'react-redux';
import NodeList from './node-list.component';
import { changePage, updateBackupPage } from '../../containers/actions';

const mapStateToProps = state => ({
  backupPage: state.appStateReducer.backupPage,
  network: state.networkReducer.network,
  page: state.appStateReducer.page,
});

const mapDispatchToProps = {
  changePage,
  updateBackupPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeList);
