import { connect } from 'react-redux';
import { deleteStatusPageAction } from '../Store/main';

import SideBar from '../Components/SideBar';

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

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
