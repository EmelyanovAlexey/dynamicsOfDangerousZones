/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';

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

import styles from './App.module.css';

// export NODE_OPTIONS=--openssl-legacy-provider
function App() {
  return (
    <BrowserRouter>
      <div className={styles.menu}>
        <SideBarContainer />
      </div>

      <StatusContainer />

      <div className={styles.pages}>
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
      </div>
    </BrowserRouter>
  );
}

export default App;
