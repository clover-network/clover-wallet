import { connect } from 'react-redux';
import SignUp from './sign-up.component';
import { signUp, setWalletName } from './actions';

const mapStateToProps = state => ({
  name: state.signUpReducer.name,
});

const mapDispatchToProps = {
  signUp,
  setWalletName,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
