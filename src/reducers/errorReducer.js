import { ActionTypes } from '../actions';

const initialState = {
  errorMessage: '',
};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ERROR_SET:
      return { ...state, errorMessage: action.message };
    case ActionTypes.ERROR_CLEAR:
      return { ...state, errorMessage: '' };
    case ActionTypes.AUTH_ERROR:
      return { ...state, errorMessage: action.message };
    default:
      return state;
  }
};

export default ErrorReducer;
