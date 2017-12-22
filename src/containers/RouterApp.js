import React, {Component} from 'react';
import { Route,  Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import PostsScreen from './PostsScreen';
import TopicsScreen from './TopicsScreen';
import * as postsSelectors from '../store/posts/reducer';

class RouterApp extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  beforeChooseGuard() {
    return this.props.isFetchedPost ? ( <PostsScreen/> ) : ( <Redirect to="/" /> );
  }

  redirectAfterChoose() {
    return this.props.isFetchedPost ? ( <Redirect to="/post" /> ) : (<TopicsScreen/> );
  }

  render () {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={this.redirectAfterChoose}/>
          <Route path="/post" render={this.beforeChooseGuard}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetchedPost: postsSelectors.isFetchedPost(state)
  };
}

RouterApp.propTypes = {
  isFetchedPost: PropTypes.bool.isRequired
};

export default withRouter(connect(mapStateToProps)(RouterApp));
