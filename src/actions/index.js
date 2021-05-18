import axios from 'axios';

// const ROOT_URL = 'https://platform.cs52.me/api';
// const API_KEY = '?key=snow';
const ROOT_URL = 'https://compli-pet-platform-server.herokuapp.com/api';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  TOGGLE_FILTER_TAG: 'TOGGLE_FILTER_TAG',
  CLEAR_FILTER_TAGS: 'CLEAR_FILTER_TAGS',
  UPDATE_SEARCH: 'UPDATE_SEARCH',
  ERROR_SET: 'ERROR_SET',
  ERROR_CLEAR: 'ERROR_CLEAR',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

const clearFilterTags = () => {
  return {
    type: ActionTypes.CLEAR_FILTER_TAGS,
    payload: null,
  };
};

export function toggleFilterTag(tag) {
  return {
    type: ActionTypes.TOGGLE_FILTER_TAG,
    payload: tag,
  };
}

export function updateSearch(search) {
  return {
    type: ActionTypes.UPDATE_SEARCH,
    payload: search,
  };
}

// trigger to deauth if there is error
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    payload: error,
  };
}

export function clearError() {
  return {
    type: ActionTypes.ERROR_CLEAR,
    payload: null,
  };
}

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

export function createPost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
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
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then(() => {
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
    axios.delete(`${ROOT_URL}/posts/${id}`, null, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch(clearFilterTags());
      history.push('/'); // navigate to main page after deletion
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function signinUser(user, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, user).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: user });
      localStorage.setItem('token', response.data.token);
      history.push('/'); // navigate to main page after signin
    }).catch((error) => {
      console.log(error);
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

export function signupUser(user, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, user).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: user });
      localStorage.setItem('token', response.data.token);
      history.push('/'); // navigate to main page after signup
    }).catch((error) => {
      console.log(error);
      dispatch(authError(`Sign Up Failed: ${error.response.data.error}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
