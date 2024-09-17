import React from 'react';

import Title from '../../Components/Title';
import List from '../../Components/List';

import styles from './ResultPage.module.css';

function ResultPage() {
  return (
    <div>
      <Title>Заключение</Title>
      <div className={styles.description}>
        По итогу моей работы у меня получилось реализовать
        <List
          list={[
            {
              id: '1',
              text:
                'Нахождение в кузове автомобиля при опусканиии-поднятии груза',
            },
            {
              id: '2',
              text: 'Нахождение в вагоне при опусканиии-поднятии груза',
            },
            {
              id: '3',
              text: 'Нахождение на платформе при опусканиии-поднятии груза',
            },
            {
              id: '4',
              text: 'Нахождение на тележке при опусканиии-поднятии груза',
            },
          ]}
        />
      </div>
      <div className={styles.description}>
        В современном мире в производстве существует много опасных и
        травмоопасных случаев, которые могут привести летальным исходам. В
        современном мире в производстве существует много опасных и травмоопасных
        случаев, которые могут привести летальным исходам.
      </div>
    </div>
  );
}

export default ResultPage;
