import React from 'react';

import Title from '../../Components/Title';

import styles from './ApiPage.module.css';

function ApiPage() {
  return (
    <div>
      <Title>API</Title>
      <div className={styles.description}>
        В современном мире в производстве существует много опасных и
        травмоопасных случаев, которые могут привести летальным исходам.
      </div>
    </div>
  );
}

export default ApiPage;
