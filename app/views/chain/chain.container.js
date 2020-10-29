import { connect } from 'react-redux';
import { changePage } from '../../containers/actions';
import Chain from './chain.component';

const mapStateToProps = state => ({
  isLoading: state.appStateReducer.isLoading,
  networks: state.networkReducer.networks,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  changePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chain);
