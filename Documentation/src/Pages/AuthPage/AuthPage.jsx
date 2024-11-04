/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../Components/Button';
import Input from '../../Components/Input';

import styles from './AuthPage.module.css';

function AuthPage({ loading, auth, registration }) {
  const [showReg, setShowReg] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // fetchApi();
  }, []);

  function handelClick() {
    const param = {
      email: login,
      password,
    };

    if (!showReg) {
      auth(param);
      return;
    }

    registration(param);
  }

  return (
    <div className={styles.root}>
      <div className={styles.bgc} />
      <div className={styles.form}>
        <div className={styles.title}>
          {showReg ? 'Регистрация' : 'Авторизация'}
        </div>

        <div className="">
          <Input
            className={styles.input}
            label="Логин"
            value={login}
            onChange={(text) => setLogin(text)}
          />

          <Input
            className={styles.input}
            label="Пароль"
            type="password"
            value={password}
            onChange={(text) => setPassword(text)}
          />

          {/* {showReg && (
            <Input
              className={styles.input}
              label="Повторить пароль"
              type="password"
            />
          )} */}
        </div>

        <div className={styles.footer}>
          <Button className={styles.t} onClick={() => setShowReg(!showReg)}>
            {!showReg ? 'Регистрация' : 'Вернуться'}
          </Button>

          <Button primary className={styles.t} onClick={() => handelClick()}>
            {!showReg ? 'Войти' : 'Отправить'}
          </Button>
        </div>
      </div>
    </div>
  );
}

AuthPage.propTypes = {
  loading: PropTypes.bool,
  auth: PropTypes.func,
  registration: PropTypes.func,
};

AuthPage.defaultProps = {
  loading: false,
  auth: () => {},
  registration: () => {},
};

export default AuthPage;
