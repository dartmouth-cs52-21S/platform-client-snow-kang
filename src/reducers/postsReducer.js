import { ActionTypes } from '../actions';
import { possibleTags } from '../components/tagFilters';

const { Set } = require('immutable');

const initialState = {
  all: [],
  current: {},
  checkedTags: new Set(),
  searchedTerm: '',
  filteredPosts: [],
  searchedPosts: [],
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
  let checkedTags, filteredPosts, searchedPosts;
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
    case ActionTypes.UPDATE_SEARCH:
      searchedPosts = state.all.filter((post) => {
        // Make an array containing parents (multiple items), tags (singular item), title (singular item)
        return post.parents.concat([post.title, post.tags])
          // Turn this array into a string and check if queried term is contained in the array
          .join(' ').toLowerCase().includes(action.payload);
      });
      return { ...state, searchedPosts, searchedTerm: action.payload };
    default:
      return state;
  }
};

export default PostsReducer;
