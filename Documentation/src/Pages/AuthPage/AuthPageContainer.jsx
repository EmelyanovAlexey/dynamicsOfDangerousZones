/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { authAction, registrationAction } from '../../Store/auth';

import AuthPage from './AuthPage';

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (data) => {
      dispatch(authAction(data));
    },
    registration: (data) => {
      dispatch(registrationAction(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
