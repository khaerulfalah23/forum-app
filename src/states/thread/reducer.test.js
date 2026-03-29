import { describe, it, expect } from 'vitest';
import { ActionType } from './action';
import threadReducer from './reducer';

describe('threadReducer function', () => {
  const initialState = {
    loading: false,
    thread: null,
    error: null,
  };

  it('should return the default state when an undefined action is passed', () => {
    // Arrange
    const action = { type: 'NOT_REGISTERED_ACTION' };

    // Action
    const result = threadReducer(undefined, action);

    // Assert
    expect(result).toEqual(initialState);
  });

  it('should update loading to true upon CREATE_THREAD_REQUEST', () => {
    // Arrange
    const action = { type: ActionType.CREATE_THREAD_REQUEST };

    // Action
    const result = threadReducer(initialState, action);

    // Assert
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should store thread data and stop loading on CREATE_THREAD_SUCCESS', () => {
    // Arrange
    const loadingState = { ...initialState, loading: true };
    const mockThread = {
      id: 'thread-abc',
      title: 'Testing Thread Reducer',
      body: 'Content of the thread',
    };

    const action = {
      type: ActionType.CREATE_THREAD_SUCCESS,
      payload: { thread: mockThread },
    };

    // Action
    const result = threadReducer(loadingState, action);

    // Assert
    expect(result.loading).toBe(false);
    expect(result.thread).toEqual(mockThread);
    expect(result.error).toBeNull();
  });

  it('should update error message and stop loading on CREATE_THREAD_FAILURE', () => {
    // Arrange
    const loadingState = { ...initialState, loading: true };
    const apiError = 'Connection timeout';

    const action = {
      type: ActionType.CREATE_THREAD_FAILURE,
      payload: { error: apiError },
    };

    // Action
    const result = threadReducer(loadingState, action);

    // Assert
    expect(result.loading).toBe(false);
    expect(result.error).toBe(apiError);
    expect(result.thread).toBeNull();
  });
});
