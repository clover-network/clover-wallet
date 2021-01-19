import { connect } from 'react-redux';
import EntryPage from './entry-page.component';
import { onBoard } from '../../actions/initialize';
import { changePage } from '../../containers/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onBoard,
  changePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryPage);
