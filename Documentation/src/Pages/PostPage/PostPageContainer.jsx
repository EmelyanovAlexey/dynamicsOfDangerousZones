/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { fetchPostAction, loadingPostAction } from '../../Store/post';

import PostPage from './PostPage';

function mapStateToProps(state) {
  return {
    posts: state.post.post,
    loading: state.post.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (data) => {
      dispatch(fetchPostAction(data));
      dispatch(loadingPostAction(true));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
