/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactOpenApiRenderer from '@tx-dts/react-openapi-renderer';
import '@tx-dts/react-openapi-renderer/dist/index.css';

import Title from '../../Components/Title';

import styles from './ApiPage.module.css';

function ApiPage({ docs, loading, fetchApi, updateTime }) {
  useEffect(() => {
    fetchApi();
    const date = new Date();

    return () => {
      const dateEnd = new Date();
      const differenceInMilliseconds = dateEnd - date;
      const differenceInSeconds = differenceInMilliseconds / 1000;
      updateTime({ page_id: 12, time_spent: Math.floor(differenceInSeconds) });
    };
  }, []);

  return (
    <div>
      <Title>API</Title>
      <div className={styles.description}>
        {loading && <p>Загрузка ...</p>}
        {!loading && docs === null && <p>нет данных</p>}
        {docs !== null && <ReactOpenApiRenderer specification={docs} />}
      </div>
    </div>
  );
}

ApiPage.propTypes = {
  docs: PropTypes.string,
  loading: PropTypes.bool,
  fetchApi: PropTypes.func,
  updateTime: PropTypes.func,
};

ApiPage.defaultProps = {
  docs: null,
  loading: false,
  fetchApi: () => {},
  updateTime: () => {},
};

export default ApiPage;
