import { connect } from 'react-redux';
import CreateAddressBook from './create-address-book.component';
import { submitContact } from './actions';
import { changePage } from '../../containers/actions';
import { selectToken } from '../../actions/account';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({
  networks: state.networkReducer.networks,
  network: state.networkReducer.network,
  toAddress: state.addressBookReducer.toAddress,
  balance: state.accountReducer.balance,
  selectedToken: state.accountReducer.selectedToken,
});

const mapDispatchToProps = {
  submitContact,
  changePage,
  selectToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAddressBook);
