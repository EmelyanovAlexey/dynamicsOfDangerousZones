import { connect } from 'react-redux';
import { updatePageAction } from '../../Store/main';

import HomePage from './HomePage';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    updateTime: (data) => {
      dispatch(updatePageAction(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
