/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import {
  fetchPostAction,
  loadingPostAction,
  inventImgAction,
} from '../../Store/post';

import PostPage from './PostPage';

function mapStateToProps(state) {
  return {
    posts: state.post.post,
    loading: state.post.loading,
    imgInvent: state.post.img,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (data) => {
      dispatch(fetchPostAction(data));
      dispatch(loadingPostAction(true));
    },
    getImgInvent: (data) => {
      dispatch(inventImgAction(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
