import { ActionType } from './action';

const initialState = {
  thread: null,
  loading: false,
  error: null,
};

function threadDetailReducer(state = initialState, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return {
      ...state,
      thread: action.payload.threadDetail,
      error: null,
    };
  case ActionType.CLEAR_THREAD_DETAIL:
    return {
      ...state,
      thread: null,
    };
  case ActionType.SET_THREAD_ERROR:
    return {
      ...state,
      error: action.payload.error,
    };
  case ActionType.SET_THREAD_LOADING:
    return {
      ...state,
      loading: action.payload.isLoading,
    };
  default:
    return state;
  }
}

export default threadDetailReducer;
