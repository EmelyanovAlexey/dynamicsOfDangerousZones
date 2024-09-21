/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactOpenApiRenderer from '@tx-dts/react-openapi-renderer';
import '@tx-dts/react-openapi-renderer/dist/index.css';

import Title from '../../Components/Title';

import styles from './ApiPage.module.css';

function ApiPage({ docs, loading, fetchApi }) {
  useEffect(() => {
    fetchApi();
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
};

ApiPage.defaultProps = {
  docs: null,
  loading: false,
  fetchApi: () => {},
};

export default ApiPage;
