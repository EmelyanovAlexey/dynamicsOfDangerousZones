import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Title from '../../Components/Title';

import styles from './HomePage.module.css';

function HomePage({ updateTime }) {
  useEffect(() => {
    const date = new Date();

    return () => {
      const dateEnd = new Date();
      const differenceInMilliseconds = dateEnd - date;
      const differenceInSeconds = differenceInMilliseconds / 1000;
      updateTime({ page_id: 13, time_spent: Math.floor(differenceInSeconds) });
    };
  }, []);

  return (
    <div>
      <Title>Введение</Title>
      <div className={styles.description}>
        В современном мире в производстве существует много опасных и
        травмоопасных случаев, которые могут привести летальным исходам.
      </div>
      <div className={styles.description}>
        В современном мире в производстве существует много опасных и
        травмоопасных случаев, которые могут привести летальным исходам. В
        современном мире в производстве существует много опасных и травмоопасных
        случаев, которые могут привести летальным исходам. В современном мире в
        производстве существует много опасных и травмоопасных случаев, которые
        могут привести летальным исходам.
      </div>
    </div>
  );
}

HomePage.propTypes = {
  updateTime: PropTypes.func,
};

HomePage.defaultProps = {
  updateTime: () => {},
};

export default HomePage;
