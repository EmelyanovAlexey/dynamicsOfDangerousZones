/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Title.module.css';

function Title({ className, children }) {
  return (
    <div className={clsx([styles.root, className])}>
      <h1 className={styles.title}>{children}</h1>
    </div>
  );
}

Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Title.defaultProps = {
  className: '',
  children: 'Заголовок',
};

export default Title;
