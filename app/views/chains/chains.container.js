import { connect } from 'react-redux';
import { changePage, updateAppLoading } from '../../containers/actions';
import Chains from './chains.component';

const mapStateToProps = state => ({
  chains: state.chains.supportChains,
  accountList: []
})

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Chains);
