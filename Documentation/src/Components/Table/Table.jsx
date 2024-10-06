/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Table.module.css';

function Table({ className, header, body }) {
  // console.log(header);
  return (
    <table className={clsx([styles.root, className])}>
      <thead>
        {header?.map((headerItem, index) => (
          <th>{headerItem}</th>
        ))}
      </thead>
      <tbody>
        {body?.map((el) => (
          <tr>
            {el?.map((bodyItem) => (
              <td key={bodyItem}>{bodyItem}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  className: PropTypes.string,
  header: PropTypes.arrayOf(PropTypes.string),
  body: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

Table.defaultProps = {
  className: '',
  header: [],
  body: [],
};

export default Table;
