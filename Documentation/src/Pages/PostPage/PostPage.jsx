/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Title from '../../Components/Title';
import Panel from '../../Components/Panel';
import ContentSlider from '../../Components/ContentSlider';

import styles from './PostPage.module.css';

function PostPage({ posts, loading, fetchPost }) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <Title>Посты</Title>
      <Panel title="Фильтр">
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
  loading: PropTypes.func,
  fetchPost: PropTypes.func,
};

PostPage.defaultProps = {
  posts: [],
  loading: false,
  fetchPost: () => {},
};

export default PostPage;
