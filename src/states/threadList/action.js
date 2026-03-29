import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '@/lib/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  RECEIVE_USERS: 'RECEIVE_USERS',
  SET_THREAD_ERROR: 'SET_THREAD_ERROR',
  SET_THREAD_LOADING: 'SET_THREAD_LOADING',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
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

function asyncFetchThreadsAndUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const [threadsData, usersData] = await Promise.all([
        api.getAllThreads(),
        api.getAllUsers(),
      ]);

      dispatch(receiveThreadsActionCreator(threadsData));
      dispatch(receiveUsersActionCreator(usersData));
    } catch (error) {
      dispatch(setThreadErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  receiveUsersActionCreator,
  setThreadErrorActionCreator,
  setThreadLoadingActionCreator,
  asyncFetchThreadsAndUsers,
};
