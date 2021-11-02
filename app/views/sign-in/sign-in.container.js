import { connect } from 'react-redux';
import SignIn from './sign-in.component';
import { unlockWallet } from './actions';
import { onBoard } from '../../actions/initialize';

const mapStateToProps = state => ({
  error: state.unlockWalletReducer.error,
  success: state.unlockWalletReducer.success,
});

const mapDispatchToProps = {
  unlockWallet,
  onBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
