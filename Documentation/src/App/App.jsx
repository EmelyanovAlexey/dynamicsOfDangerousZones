/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect, useHistory } from 'react-router-dom';

// контейнеры
import SideBarContainer from '../Containers/SideBarContainer';
import StatusContainer from '../Containers/StatusContainer';

// страницы
import HomePageContainer from '../Pages/HomePage/HomePageContainer';
import DescriptionPageContainer from '../Pages/DescriptionPage/DescriptionPageContainer';
import ResultPageContainer from '../Pages/ResultPage/ResultPageContainer';
import PostPageContainer from '../Pages/PostPage/PostPageContainer';
import ApiPageContainer from '../Pages/ApiPage/ApiPageContainer';
import StaticticPageContainer from '../Pages/StaticticPage/StaticticPageContainer';
import AuthPageContainer from '../Pages/AuthPage/AuthPageContainer';
import { parseJWT } from '../Utils/JWT';

import styles from './App.module.css';

// export NODE_OPTIONS=--openssl-legacy-provider
function App({ user, loading, setUser }) {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    setShowMenu(!window.location.href.includes('auth'));
  }, [window.location.href]);

  useEffect(() => {
    const storedAuthDataText = localStorage.getItem('AUTH_DATA');

    if (storedAuthDataText) {
      const storedAuthData = JSON.parse(storedAuthDataText);
      const curDate = new Date();
      const exp = parseJWT(storedAuthData.access_token)?.exp;

      if (curDate <= new Date(exp * 1000)) {
        setUser(storedAuthData);

        if (window.location.href.includes('/auth')) {
          window.location.href = '/home';
        }
        return;
      }
    }

    if (!window.location.href.includes('/auth')) {
      window.location.href = '/auth';
    }
  }, [user?.email]);

  return (
    <BrowserRouter>
      <div className={styles.menu}>{showMenu && <SideBarContainer />}</div>

      <StatusContainer />

      <div className={styles.pages}>
        <Route exact path="/">
          <Redirect to="/auth" />
        </Route>
        <Route exact path="/home" render={() => <HomePageContainer />} />
        <Route
          exact
          path="/description"
          render={() => <DescriptionPageContainer />}
        />
        <Route exact path="/result" render={() => <ResultPageContainer />} />
        <Route exact path="/post" render={() => <PostPageContainer />} />
        <Route exact path="/api" render={() => <ApiPageContainer />} />
        <Route
          exact
          path="/statistic"
          render={() => <StaticticPageContainer />}
        />
        <Route exact path="/auth" render={() => <AuthPageContainer />} />
      </div>
    </BrowserRouter>
  );
}

App.propTypes = {
  user: PropTypes.string,
  loading: PropTypes.bool,
  setUser: PropTypes.func,
};

App.defaultProps = {
  user: undefined,
  loading: false,
  setUser: () => {},
};

export default App;
