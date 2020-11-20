import { connect } from 'react-redux';
import NodeSetting from './node-setting.component';
import { changePage, updateBackupPage } from '../../containers/actions';

const mapStateToProps = state => ({
  backupPage: state.appStateReducer.backupPage,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  changePage,
  updateBackupPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeSetting);
