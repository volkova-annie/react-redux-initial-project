// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

// начальный state topics
const initialState = Immutable({
  topicsByUrl: undefined,
  selectedTopicUrls: [],
  selectionFinalized: false,
  filterKey: '',
  filterIsReverse: false
});

//
export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOPICS_FETCHED:
      return state.merge({
        topicsByUrl: action.topicsByUrl
      });
    case types.TOPICS_SELECTED:
      return state.merge({
        selectedTopicUrls: action.selectedTopicUrls
      });
    case types.TOPIC_SELECTION_FINALIZED:
      return state.merge({
        selectionFinalized: true
      });
    case types.TOPIC_SELECTION_UNFINALIZED:
      return state.merge({
        selectionFinalized: false
      });
    case types.TOPIC_CLEAR:
      return state.merge({
        selectedTopicUrls: initialState.selectedTopicUrls,
        selectionFinalized: initialState.selectionFinalized
      });
    case types.FILTER_BY:
      return state.merge({
        filterKey: action.filterKey
      });
    case types.FILTER_REVERSE:
      return state.merge({
        filterIsReverse: action.filterIsReverse
      });
    default:
      return state;
  }
}

// selectors

export function getTopics(state) {
  const orderDirection = state.topics.filterIsReverse ? 'desc' : 'asc';
  const key = state.topics.filterKey;
  let topicsByUrl;

  if (key) {
    const orderBy = (topic) => {
      switch (key) {
        case 'date':
          return topic.created;
        case 'title':
        default:
          return topic.url;
      }
    };

    topicsByUrl = _.keyBy(_.orderBy(state.topics.topicsByUrl, orderBy, orderDirection), (topic) => topic.url);
  } else {
    topicsByUrl = state.topics.topicsByUrl;
  }

  const topicsUrlArray = _.keys(topicsByUrl);
  return [topicsByUrl, topicsUrlArray];
}

export function getSelectedTopicUrls(state) {
  return state.topics.selectedTopicUrls;
}

export function getSelectedTopicsByUrl(state) {
  return _.mapValues(_.keyBy(state.topics.selectedTopicUrls), (topicUrl) => state.topics.topicsByUrl[topicUrl]);
}

export function isTopicSelectionValid(state) {
  return state.topics.selectedTopicUrls.length === 3;
}

export function isTopicSelectionFinalized(state) {
  return state.topics.selectionFinalized;
}

export function getCurrentFilter(state) {
  return [state.topics.filterKey, state.topics.filterIsReverse];
}
