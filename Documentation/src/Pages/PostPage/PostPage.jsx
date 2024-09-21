/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Title from '../../Components/Title';
import Panel from '../../Components/Panel';
import ContentSlider from '../../Components/ContentSlider';

import styles from './PostPage.module.css';

function PostPage({ posts, loading, imgInvent, fetchPost, getImgInvent }) {
  const [count, setCount] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

  // отправка изображения для инвертации
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Создаем formData и отправляем его на сервер
    const formData = new FormData();
    formData.append('file', file);
    getImgInvent(formData);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <Title>Посты</Title>
      <Panel title="Инвертация изображения">
        <div className={styles.imgs}>
          <input type="file" onChange={handleFileUpload} />

          {selectedFile && (
            <div className={styles.img_block}>
              <p>Исходное изображение:</p>
              <img src={URL.createObjectURL(selectedFile)} alt="Original" />
            </div>
          )}

          {imgInvent && (
            <div className={styles.img_block}>
              <p>Исходное изображение:</p>
              <img src={URL.createObjectURL(imgInvent)} alt="Invent" />
            </div>
          )}
        </div>
      </Panel>

      <Panel className={styles.filter} title="Фильтр">
        <ContentSlider
          label={`Количество постов ${count}`}
          max={posts.length}
          value={count}
          onChange={(param) => setCount(param)}
        />
      </Panel>

      {loading && <p>Загрузка ....</p>}

      {!loading &&
        posts.slice(0, count)?.map((post) => (
          <div className={styles.post} key={post.id}>
            <div className={styles.title}>{post.title}</div>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{
                __html: post.text.replace(/\n/g, '<br />'),
              }}
            />
          </div>
        ))}
    </div>
  );
}

PostPage.propTypes = {
  posts: PropTypes.string,
  loading: PropTypes.bool,
  imgInvent: PropTypes.string,
  fetchPost: PropTypes.func,
  getImgInvent: PropTypes.func,
};

PostPage.defaultProps = {
  posts: [],
  loading: false,
  imgInvent: null,
  fetchPost: () => {},
  getImgInvent: () => {},
};

export default PostPage;
