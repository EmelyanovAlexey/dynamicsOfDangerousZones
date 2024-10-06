/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Title from '../../Components/Title';
import Table from '../../Components/Table';

import { statisticHeader } from '../../Shered/const';

import styles from './StaticticPage.module.css';

function StaticticPage({ loading, data, fetchStatistic }) {
  useEffect(() => {
    fetchStatistic();
  }, []);

  return (
    <div>
      <Title>Статистика веб ресурса</Title>

      <Table header={statisticHeader} body={data} />

      {loading && <p>Загрузка ...</p>}
    </div>
  );
}

StaticticPage.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.string,
  fetchStatistic: PropTypes.func,
};

StaticticPage.defaultProps = {
  loading: false,
  data: '',
  fetchStatistic: () => {},
};

export default StaticticPage;
