import { connect } from 'react-redux';
import { changePage } from '../../containers/actions';
import Chain from './chain.component';

const mapStateToProps = state => ({
  isLoading: state.appStateReducer.isLoading,
  networks: state.networkReducer.networks,
});

const mapDispatchToProps = {
  changePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chain);
