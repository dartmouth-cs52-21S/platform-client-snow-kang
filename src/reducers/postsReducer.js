import { ActionTypes } from '../actions';
import { possibleTags } from '../components/tagFilters';

const { Set } = require('immutable');

const initialState = {
  all: [],
  current: {},
  checkedTags: new Set(),
  filteredPosts: [],
};

const filterPost = (postTag, checkedTags) => {
  if (checkedTags.has(postTag)) {
    return true;
  } else if (checkedTags.has('other') && (!possibleTags.includes(postTag) || postTag === 'other')) {
    return true;
  }
  return false;
};

const PostsReducer = (state = initialState, action) => {
  let checkedTags, filteredPosts;
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload };
    case ActionTypes.TOGGLE_FILTER_TAG:
      checkedTags = state.checkedTags.has(action.payload)
        ? state.checkedTags.delete(action.payload)
        : state.checkedTags.add(action.payload);
      filteredPosts = state.all.filter((post) => filterPost(post.tags.toLowerCase(), checkedTags));
      return { ...state, checkedTags, filteredPosts };
    case ActionTypes.CLEAR_FILTER_TAGS:
      return { ...state, checkedTags: new Set(), filteredPosts: [] };
    default:
      return state;
  }
};

export default PostsReducer;
