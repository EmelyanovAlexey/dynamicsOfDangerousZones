import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Button from '../../../UiKit/Button';
import Glyph from '../../../UiKit/Glyph';

import styles from '../Status.module.css';

/**
 * Тост статуса о выполнении события
 *
 * @param {Object} card объект для отображения тоста
 * @param {Function} onClick функция для скрытия текущего тоста
 */
function Status({ card, onClick }) {
  // получить цвет карты по статусу
  function getColorCard() {
    if (card.status === 'error') {
      return styles.status_error;
    }
    if (card.status === 'good') {
      return styles.status_good;
    }
    return styles.status_warning;
  }

  // получить цвет карты по статусу
  function getIconCard() {
    if (card.status === 'error') {
      return <img src="../../../../SVG/error.svg" alt="icon" />;
    }
    if (card.status === 'good') {
      return <img src="../../../../SVG/good.svg" alt="icon" />;
    }
    return <img src="../../../../SVG/warning.svg" alt="icon" />;
  }

  useEffect(() => {
    setTimeout(() => {
      onClick(card.id);
    }, 7000);
  }, [card]);

  return (
    <div className={clsx([styles.status_card, getColorCard()])} key={card.id}>
      <div className={styles.status_info}>
        <div className={styles.status_icon}>{getIconCard()}</div>
        <div className={styles.status_text}>
          <div className={styles.status_title}>{card.title}</div>
          {card.description !== '' && (
            <div className={styles.status_description}>{card.description}</div>
          )}
        </div>
      </div>

      <Button className={styles.status_btn} onClick={() => onClick(card.id)}>
        <Glyph className={styles.status_btnIcon} name="Cross" />
      </Button>
    </div>
  );
}

Status.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

Status.defaultProps = {
  card: null,
  onClick: () => {},
};

export default Status;
