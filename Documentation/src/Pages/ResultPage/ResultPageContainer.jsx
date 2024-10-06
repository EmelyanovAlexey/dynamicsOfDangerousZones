import { connect } from 'react-redux';
import { updatePageAction } from '../../Store/main';

import ResultPage from './ResultPage';

function mapStateToProps() {}

function mapDispatchToProps(dispatch) {
  return {
    updateTime: (data) => {
      dispatch(updatePageAction(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
