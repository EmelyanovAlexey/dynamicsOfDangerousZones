import { connect } from 'react-redux';
import { deleteStatusPageAction } from '../Store/main';

import Status from '../Components/Status';

function mapStateToProps(state) {
  return {
    cards: state.main.status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: (data) => {
      dispatch(deleteStatusPageAction(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Status);
