import { connect } from 'react-redux';
import { fetchStatisticAction } from '../../Store/statisctic';

import StaticticPage from './StaticticPage';

function mapStateToProps(state) {
  return {
    loading: state.statisctic.loading,
    data: state.statisctic.statisctics,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStatistic: (data) => {
      dispatch(fetchStatisticAction(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StaticticPage);
