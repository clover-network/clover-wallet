import { connect } from 'react-redux';
import SignIn from './sign-in.component';
import { unlockClover } from './actions';
import { onBoard } from '../../actions/initialize';

const mapStateToProps = state => ({
  error: state.unlockCloverReducer.error,
  success: state.unlockCloverReducer.success,
});

const mapDispatchToProps = {
  unlockClover,
  onBoard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
