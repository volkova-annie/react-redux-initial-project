// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import _ from 'lodash';
import * as types from './actionTypes';
import redditService from '../../services/reddit';
import * as topicsSelectors from './reducer';
import * as postActions from '../posts/actions';

export function fetchTopics() {
  return (dispatch) => {
    redditService.getDefaultSubreddits()
      .then(subredditArray => {
        const topicsByUrl = _.keyBy(subredditArray, (subreddit) => subreddit.url);
        dispatch({ type: types.TOPICS_FETCHED, topicsByUrl });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function selectTopic(topicUrl) {
  return (dispatch, getState) => {
    const selectedTopics = topicsSelectors.getSelectedTopicUrls(getState());
    let newSelectedTopics;
    if (_.indexOf(selectedTopics, topicUrl) !== -1) {
      newSelectedTopics = _.without(selectedTopics, topicUrl);
      dispatch({ type: types.TOPIC_SELECTION_UNFINALIZED });
    } else {
      newSelectedTopics = selectedTopics.length < 3 ?
        selectedTopics.concat(topicUrl) :
        selectedTopics.slice(1).concat(topicUrl);
    }
    dispatch({ type: types.TOPICS_SELECTED, selectedTopicUrls: newSelectedTopics  });
    // optimization - prefetch the posts before going to the posts screen
    if (newSelectedTopics.length === 3) {
      dispatch(postActions.fetchPosts());
      dispatch({ type: types.TOPIC_SELECTION_FINALIZED });
    }
  };
}

export function clearTopics() {
  return ({ type: types.TOPIC_CLEAR });
}

export function finalizeTopicSelection() {
  return ({ type: types.TOPIC_SELECTION_FINALIZED });
}

export function filter(filterKey) {
  return (dispatch, getState) => {
    const [stateFilterKey, filterIsReverse] = topicsSelectors.getCurrentFilter(getState());
    if (filterKey === stateFilterKey) {
      dispatch({ type: types.FILTER_REVERSE, filterIsReverse: !filterIsReverse });
    } else {
      dispatch({ type: types.FILTER_BY, filterKey });
      dispatch({ type: types.FILTER_REVERSE, filterIsReverse: false });
    }
  };
}
