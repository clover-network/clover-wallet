import { connect } from 'react-redux';
import CreateAccount from './create-account.component';
import {
  createFirstAccountWithSeedPhrase,
  resetImportAccountWithSeedPhraseError,
  setKeypairType,
  setAndStartOnBoarding,
  createFirstAccountWithSeedPhraseSuccess,
} from './actions';
import { updateAppLoading, changePage } from '../../containers/actions';
import { createToast } from '../../constants/toast';

const mapStateToProps = state => ({
  seedWords: state.accountReducer.seedWords,
  account: state.accountReducer.account,
  aliasError: state.createAccountReducer.aliasError,
  error: state.createAccountReducer.error,
  success: state.createAccountReducer.success,
  keypairType: state.createAccountReducer.keypairType,
  keypairTypes: state.createAccountReducer.keypairTypes,
});

const mapDispatchToProps = {
  createFirstAccountWithSeedPhrase,
  resetImportAccountWithSeedPhraseError,
  setKeypairType,
  setAndStartOnBoarding,
  createFirstAccountWithSeedPhraseSuccess,
  updateAppLoading,
  changePage,
  createToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
