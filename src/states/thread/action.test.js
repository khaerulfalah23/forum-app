import api from '@/lib/api';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import {
  asyncCreateThread,
  createThreadRequest,
  createThreadSuccess,
  createThreadFailure,
} from './action';

const mockThreadResponse = {
  id: 'thread-1',
  title: 'Thread Title',
  body: 'Thread Body',
  category: 'general',
  createdAt: '2026-03-29T00:00:00.000Z',
  owner: { id: 'user-1', name: 'John Doe' },
};

describe('asyncCreateThread thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'createThread');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch actions correctly when thread creation is successful', async () => {
    // Arrange
    const threadData = {
      title: 'Thread Title',
      body: 'Thread Body',
      category: 'general',
    };
    const dispatch = vi.fn();
    api.createThread.mockResolvedValue(mockThreadResponse);

    // Action
    await asyncCreateThread(threadData)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(createThreadRequest());
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      createThreadSuccess(mockThreadResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch failure actions and throw error when API call fails', async () => {
    // Arrange
    const threadData = {
      title: 'Thread Title',
      body: 'Thread Body',
      category: 'general',
    };
    const dispatch = vi.fn();
    const errorMessage = 'Network Error';
    api.createThread.mockRejectedValue(new Error(errorMessage));

    // Action & Assert
    try {
      await asyncCreateThread(threadData)(dispatch);
    } catch {
      // Error
    }

    expect(dispatch).toHaveBeenCalledWith(createThreadRequest());
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(createThreadFailure(errorMessage));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
