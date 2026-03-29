import { ActionType } from './action';

const initialState = {
  threads: [],
  users: [],
  loading: false,
  error: null,
};

function threadListReducer(state = initialState, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return {
      ...state,
      threads: action.payload.threads,
    };
  case ActionType.RECEIVE_USERS:
    return {
      ...state,
      users: action.payload.users,
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

export default threadListReducer;
