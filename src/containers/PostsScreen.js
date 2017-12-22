// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as postsActions from '../store/posts/actions';
import * as postsSelectors from '../store/posts/reducer';
import * as topicsSelectors from '../store/topics/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';
import TopicFilter from '../components/TopicFilter';
import PostView from '../components/PostView';
import style from '../styles/styles.scss';

class PostsScreen extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderRow(postId, post) {
    const selected = this.props.currentPost === post;
    return (
      <ListRow
        rowId={postId}
        onClick={this.props.postsActions.selectPost}
        selected={selected}>
        {!post.thumbnail ? false :
          <img className={style.thumbnail} src={post.thumbnail} alt="thumbnail" />
        }
        <h3>{post.title}</h3>
      </ListRow>
    );
  }

  render() {
    if (!this.props.postsById) return this.renderLoading();
    return (
      <div className={style.PostsScreen}>
        <div className={style.LeftPane}>
          <TopicFilter
            className={style.TopicFilter}
            topics={this.props.topicsByUrl}
            selected={this.props.currentFilter}
            onChanged={this.props.postsActions.changeFilter}
          />
          <ListView
            rowsIdArray={this.props.postsIdArray}
            rowsById={this.props.postsById}
            renderRow={this.renderRow} />
        </div>
        <div className={style.ContentPane}>
          <PostView post={this.props.currentPost} />
        </div>
      </div>
    );
  }
}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
  const [postsById, postsIdArray] = postsSelectors.getPosts(state);
  return {
    postsById,
    postsIdArray,
    topicsByUrl: topicsSelectors.getSelectedTopicsByUrl(state),
    currentFilter: postsSelectors.getCurrentFilter(state),
    currentPost: postsSelectors.getCurrentPost(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postsActions: bindActionCreators(postsActions, dispatch)
  };
}

PostsScreen.propTypes = {
  topicsByUrl: PropTypes.object.isRequired,
  currentFilter: PropTypes.string.isRequired,
  postsActions: PropTypes.object.isRequired,
  postsIdArray: PropTypes.array.isRequired,
  postsById: PropTypes.object.isRequired,
  currentPost: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsScreen));
