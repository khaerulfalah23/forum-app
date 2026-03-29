import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CommentInput } from './CommentInput';

const createMockStore = (initialLoading = false) => {
  return configureStore({
    reducer: {
      comment: (state = { loading: initialLoading }) => state,
    },
  });
};

describe('CommentInput component', () => {
  afterEach(cleanup);

  it('should update the textarea value when user types', async () => {
    // Arrange
    const onAddCommentSpy = vi.fn();
    const store = createMockStore();
    render(
      <Provider store={store}>
        <CommentInput onAddComment={onAddCommentSpy} />
      </Provider>,
    );

    const inputArea = screen.getByPlaceholderText(/tuliskan pemikiranmu/i);

    // Action
    await userEvent.type(inputArea, 'Hello World');

    // Assert
    expect(inputArea.value).toBe('Hello World');
  });

  it('should call onAddComment with correct content when form is submitted', async () => {
    // Arrange
    const onAddCommentSpy = vi.fn();
    const store = createMockStore();
    render(
      <Provider store={store}>
        <CommentInput onAddComment={onAddCommentSpy} />
      </Provider>,
    );

    const inputArea = screen.getByPlaceholderText(/tuliskan pemikiranmu/i);
    const submitBtn = screen.getByRole('button');

    // Action
    await userEvent.type(inputArea, 'New comment content');
    await userEvent.click(submitBtn);

    // Assert
    expect(onAddCommentSpy).toHaveBeenCalledWith('New comment content');
  });

  it('should reset the textarea after a successful submission', async () => {
    // Arrange
    const onAddCommentSpy = vi.fn();
    const store = createMockStore();
    render(
      <Provider store={store}>
        <CommentInput onAddComment={onAddCommentSpy} />
      </Provider>,
    );

    const inputArea = screen.getByPlaceholderText(/tuliskan pemikiranmu/i);
    const submitBtn = screen.getByRole('button');

    // Action
    await userEvent.type(inputArea, 'This text should be cleared');
    await userEvent.click(submitBtn);

    // Assert
    expect(inputArea.value).toBe('');
  });

  it('should disable the submit button when the comment state is loading', () => {
    // Arrange
    const onAddCommentSpy = vi.fn();
    const store = createMockStore(true);

    render(
      <Provider store={store}>
        <CommentInput onAddComment={onAddCommentSpy} />
      </Provider>,
    );

    const submitBtn = screen.getByRole('button');

    expect(submitBtn).toBeDisabled();
  });
});
