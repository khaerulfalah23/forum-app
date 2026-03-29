import { describe, it, expect } from 'vitest';
import { ActionType } from './action';
import commentReducer from './reducer';

describe('commentReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Action
    const result = commentReducer(initialState, action);

    // Assert
    expect(result).toEqual(initialState);
  });

  it('should add a new comment when given ADD_COMMENT action', () => {
    // Arrange
    const initialState = [];
    const newComment = { id: 'c-1', content: 'New Comment' };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: newComment,
      },
    };

    // Action
    const nextState = commentReducer(initialState, action);

    // Assert
    expect(nextState).toContain(newComment);
    expect(nextState).toHaveLength(1);
    expect(nextState[0]).toEqual(newComment);
  });

  it('should handle SET_ERROR by returning the current state', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: ActionType.SET_ERROR,
      payload: {
        error: 'Failed to fetch',
      },
    };

    // Action
    const nextState = commentReducer(initialState, action);

    // Assert
    expect(Array.isArray(nextState)).toBe(true);
    expect(nextState).toEqual(initialState);
  });
});
