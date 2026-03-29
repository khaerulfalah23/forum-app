import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '@/lib/api';
import { receiveCommentsActionCreator } from '../comment/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  SET_THREAD_ERROR: 'SET_THREAD_ERROR',
  SET_THREAD_LOADING: 'SET_THREAD_LOADING',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function setThreadErrorActionCreator(error) {
  return {
    type: ActionType.SET_THREAD_ERROR,
    payload: {
      error,
    },
  };
}

function setThreadLoadingActionCreator(isLoading) {
  return {
    type: ActionType.SET_THREAD_LOADING,
    payload: {
      isLoading,
    },
  };
}

function asyncFetchThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch({ type: ActionType.CLEAR_THREAD_DETAIL });
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch({
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: { threadDetail },
      });

      dispatch(receiveCommentsActionCreator(threadDetail.comments));
    } catch (error) {
      dispatch({
        type: ActionType.SET_THREAD_ERROR,
        payload: { error: error.message },
      });
    } finally {
      dispatch({
        type: ActionType.SET_THREAD_LOADING,
        payload: { isLoading: false },
      });
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  setThreadErrorActionCreator,
  setThreadLoadingActionCreator,
  asyncFetchThreadDetail,
};
