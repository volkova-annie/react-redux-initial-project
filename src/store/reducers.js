import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topics from './topics/reducer';
import posts from './posts/reducer';

const rootReducer = combineReducers({
  topics,
  posts,
  routing: routerReducer
});

export default rootReducer;
