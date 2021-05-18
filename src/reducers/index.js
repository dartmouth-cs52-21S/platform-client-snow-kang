// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import PostsReducer from './postsReducer';
import AuthReducer from './authReducer';
import ErrorReducer from './errorReducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  error: ErrorReducer,
  auth: AuthReducer,
});

export default rootReducer;
