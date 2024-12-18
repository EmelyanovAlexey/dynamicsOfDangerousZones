import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Title from '../../Components/Title';
import List from '../../Components/List';

import styles from './DescriptionPage.module.css';

function DescriptionPage({ updateTime }) {
  useEffect(() => {
    const date = new Date();

    return () => {
      const dateEnd = new Date();
      const differenceInMilliseconds = dateEnd - date;
      const differenceInSeconds = differenceInMilliseconds / 1000;
      updateTime({ page_id: 14, time_spent: Math.floor(differenceInSeconds) });
    };
  }, []);

  return (
    <div>
      <Title>Описание</Title>

      <div className={styles.description}>
        <p>
          Детекция опасных зон на производстве - программа предназначена для
          обеспечения безопасности на производстве с использованием кранов. Она
          автоматически отслеживает потенциально опасные ситуации, которые могут
          возникнуть при работе крана, и предотвращает возможные несчастные
          случаи. Программа анализирует зону работы крана и выявляет присутствие
          работников в опасных местах во время подъема или опускания груза.
        </p>
        <p>
          Основные сценарии, которые программа контролирует, включают нахождение
          человека в кузове автомобиля, вагоне, на платформе или тележке во
          время работы крана. Если система обнаруживает, что работник находится
          в одной из этих зон в момент подъема или опускания груза, она
          мгновенно блокирует движение крана. Это предотвращает возможные аварии
          и защищает жизнь и здоровье работников.
        </p>
        <p>
          Использование нашей программы позволяет повысить уровень безопасности
          на производстве, минимизируя риск несчастных случаев, связанных с
          работой крана. Это решение интегрируется в производственные процессы и
          помогает компаниям соблюдать стандарты безопасности и заботиться о
          своих сотрудниках.
        </p>
      </div>

      <h2 className={styles.title_block}>
        Пример <span>#</span>
      </h2>
      <img src="../../../Img/img_1.png" alt="картинка" />
      <p>
        Рисунок на кготором изображен пример с камеры предприятия
        сталиплавильного производства.
      </p>

      <h2 className={styles.title_block}>
        Примеры <span>#</span>
      </h2>
      <table className={styles.custom_table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Колонка</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Название так пойдет</td>
            <td>Описание</td>
            <td>Колонка</td>
          </tr>
          <tr>
            <td>Название</td>
            <td>Описание че го то</td>
            <td>Колонка</td>
          </tr>
          <tr>
            <td>Название</td>
            <td>Описание</td>
            <td>Колонка</td>
          </tr>
          <tr>
            <td>Название</td>
            <td>Описание</td>
            <td>Колонка</td>
          </tr>
        </tbody>
      </table>

      <h2 className={styles.title_block}>
        Области применения <span>#</span>
      </h2>

      <div className={styles.description}>
        <List
          list={[
            {
              id: '1',
              text: 'Любой производство с опасными зонами',
            },
            {
              id: '2',
              text: 'Зона строительных работ',
            },
            {
              id: '3',
              text: 'Зона работ самогрузов и кранов',
            },
          ]}
        />
      </div>
    </div>
  );
}

DescriptionPage.propTypes = {
  updateTime: PropTypes.func,
};

DescriptionPage.defaultProps = {
  updateTime: () => {},
};

export default DescriptionPage;
