import api from '@/lib/api';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import {
  asyncAddComment,
  addCommentActionCreator,
  setErrorActionCreator,
} from './action';

const mockCommentResponse = {
  id: 'comment-1',
  content: 'Test comment content',
  createdAt: '2024-01-01T00:00:00.000Z',
  owner: { id: 'user-1', name: 'John Doe' },
};

const mockErrorResponse = new Error('Network Error');

describe('asyncAddComment thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'createComment');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch actions correctly when comment is created successfully', async () => {
    // Arrange
    const threadId = 'thread-1';
    const content = 'Hello world';
    const dispatch = vi.fn();
    api.createComment.mockResolvedValue(mockCommentResponse);

    // Action
    await asyncAddComment(threadId, content)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      addCommentActionCreator(mockCommentResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch error action when comment creation fails', async () => {
    // Arrange
    const threadId = 'thread-1';
    const content = 'Hello world';
    const dispatch = vi.fn();
    api.createComment.mockRejectedValue(mockErrorResponse);

    // Action
    await asyncAddComment(threadId, content)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setErrorActionCreator(mockErrorResponse.message),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
