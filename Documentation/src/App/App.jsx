/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';

// контейнеры
import SideBarContainer from '../Containers/SideBarContainer';
import StatusContainer from '../Containers/StatusContainer';

// страницы
import HomePage from '../Pages/HomePage';
import DescriptionPage from '../Pages/DescriptionPage';
import ResultPage from '../Pages/ResultPage';
import PostPageContainer from '../Pages/PostPage/PostPageContainer';
import ApiPageContainer from '../Pages/ApiPage/ApiPageContainer';

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
        <Route exact path="/home" render={() => <HomePage />} />
        <Route exact path="/description" render={() => <DescriptionPage />} />
        <Route exact path="/result" render={() => <ResultPage />} />
        <Route exact path="/post" render={() => <PostPageContainer />} />
        <Route exact path="/api" render={() => <ApiPageContainer />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
