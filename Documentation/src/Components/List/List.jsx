/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './List.module.css';

function List({ className, list }) {
  return (
    <ul className={clsx([styles.root, className])}>
      {list.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

List.propTypes = {
  className: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.node,
    }),
  ),
};

List.defaultProps = {
  className: '',
  list: [],
};

export default List;
