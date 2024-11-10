import { connect } from 'react-redux';
import { saveUserAction } from '../Store/auth';

import App from '../App';

function mapStateToProps(state) {
  return {
    user: state.auth.data,
    loading: state.auth.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (data) => {
      dispatch(saveUserAction(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// const storedAuthData = JSON.parse(storedAuthDataText);
// const storedAuthDataText = localStorage.getItem(AUTH_DATA);

// localStorage.setItem(AUTH_DATA, JSON.stringify(authSessionData));
