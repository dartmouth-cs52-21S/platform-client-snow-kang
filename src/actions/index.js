import axios from 'axios';

// const ROOT_URL = 'https://platform.cs52.me/api';
// const API_KEY = '?key=snow';
// const ROOT_URL = 'https://compli-pet-platform-server.herokuapp.com/api';
const ROOT_URL = 'http://localhost:9090/api';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  TOGGLE_FILTER_TAG: 'TOGGLE_FILTER_TAG',
  CLEAR_FILTER_TAGS: 'CLEAR_FILTER_TAGS',
  ERROR_SET: 'ERROR_SET',
  ERROR_CLEAR: 'ERROR_CLEAR',
};

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

const clearFilterTags = () => {
  return {
    type: ActionTypes.CLEAR_FILTER_TAGS,
    payload: null,
  };
};

export function createPost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post).then((response) => {
      dispatch(clearFilterTags());
      history.push('/'); // navigate to main page after creation
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function updatePost(id, post, history, stayOnPage) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, post).then(() => {
      if (!stayOnPage) {
        dispatch(clearFilterTags());
        history.push('/'); // navigate to main page after update
      } else {
        history.go(0);
      }
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`).then((response) => {
      dispatch(clearFilterTags());
      history.push('/'); // navigate to main page after deletion
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function toggleFilterTag(tag) {
  return {
    type: ActionTypes.TOGGLE_FILTER_TAG,
    payload: tag,
  };
}
