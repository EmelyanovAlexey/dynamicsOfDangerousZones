import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import Button from '../Button';

import styles from './ModalСonfirm.module.css';

/**
 * Модальное окно выбора действия (да, нет)
 *
 * @param {String} title строка заголовка модального окна
 * @param {String} text текст вопроса
 * @param {Function} setShowModalСonfirm функиця для смены активности
 * отображения модального окна выбора
 * @param {Function} clickFunction функция при клике да, соглашения
 */
function ModalСonfirm({
  className,
  title,
  text,
  error,
  setModalСonfirm,
  clickFunction,
}) {
  return (
    <div className={styles.root}>
      <div className={styles.fon} />
      <div className={clsx([styles.confirm, className])}>
        <div className={styles.header}>
          <h2>{title}?</h2>
        </div>
        <div className={styles.content}>
          <p>{text}</p>
        </div>
        <div className={styles.error}>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(`${error}`),
            }}
          />
        </div>
        <div className={styles.footer}>
          <Button
            className={styles.btnLink}
            onClick={() => {
              setModalСonfirm(false);
            }}
          >
            Отмена
          </Button>
          <Button
            className={styles.btn}
            primary
            disabled={error !== ''}
            onClick={() => {
              setModalСonfirm(false);
              clickFunction();
            }}
          >
            Да
          </Button>
        </div>
      </div>
    </div>
  );
}

ModalСonfirm.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  error: PropTypes.string,
  setModalСonfirm: PropTypes.func,
  clickFunction: PropTypes.func,
};

ModalСonfirm.defaultProps = {
  className: '',
  title: 'Вы действительно хотите... ',
  text: 'Описание',
  error: '',
  setModalСonfirm: () => {},
  clickFunction: () => {},
};

export default ModalСonfirm;
