import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import './Skeleton.css';

/**
 * Поле ввода
 *
 * @param {String} title название данного поля ввода
 * @param {String} type тип для того что бы знать куда сохранять значение
 * @param {String} textInput изначальный текст
 */
function Skeleton({ className, countRow }) {
  return (
    <div className={clsx(['skeleton', className])}>
      {[...Array(countRow).keys()].map((row) => (
        <div className="skeleton_row" key={row} />
      ))}
    </div>
  );
}

Skeleton.propTypes = {
  className: PropTypes.string,
  countRow: PropTypes.number,
};

Skeleton.defaultProps = {
  className: '',
  countRow: 1,
};

export default Skeleton;
