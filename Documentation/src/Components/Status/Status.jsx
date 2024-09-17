import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Card from './paths/Card';

import styles from './Status.module.css';

/**
 * Тост статуса о выполнении события
 *
 * @param {String} className название стиля класса
 * @param {Array} cards массив данных по карточкам статуса
 * @param {Function} onClick функция клика на карточку (удаление)
 */
function Status({ className, cards, onClick }) {
  return (
    <div className={clsx([styles.status, className])}>
      {cards.map((card) => (
        <div key={card.id}>
          <Card
            card={card}
            onClick={(id) => {
              onClick(id);
            }}
          />
        </div>
      ))}
    </div>
  );
}

Status.propTypes = {
  className: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
  onClick: PropTypes.func,
};

Status.defaultProps = {
  className: '',
  cards: [],
  onClick: () => {},
};

export default Status;
