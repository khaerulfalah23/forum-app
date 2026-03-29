import { ActionType } from './action';

const initialState = {
  loading: false,
  thread: null,
  error: null,
};

function threadReducer(state = initialState, action = {}) {
  switch (action.type) {
  case ActionType.CREATE_THREAD_REQUEST:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case ActionType.CREATE_THREAD_SUCCESS:
    return {
      ...state,
      loading: false,
      thread: action.payload.thread,
      error: null,
    };
  case ActionType.CREATE_THREAD_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload.error,
    };
  default:
    return state;
  }
}

export default threadReducer;
