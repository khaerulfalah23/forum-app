/* eslint-disable no-unused-vars */
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { within, userEvent } from '@storybook/test';
import { CommentInput } from './CommentInput';

const mockCommentSlice = (initialLoading = false) =>
  createSlice({
    name: 'comment',
    initialState: { loading: initialLoading },
    reducers: {},
  });

const MockStore = ({ children, loading = false }) => (
  <Provider
    store={configureStore({
      reducer: {
        comment: mockCommentSlice(loading).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  title: 'Components/CommentInput',
  component: CommentInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onAddComment: { action: 'comment added' },
  },
};

export const Default = {
  decorators: [
    (Story) => (
      <MockStore>
        <div className='w-125 p-4 bg-slate-50 rounded-lg'>
          <Story />
        </div>
      </MockStore>
    ),
  ],
  args: {
    onAddComment: (content) => console.log('Komentar terkirim:', content),
  },
};

export const Loading = {
  decorators: [
    (Story) => (
      <MockStore loading={true}>
        <div className='w-125 p-4 bg-slate-50 rounded-lg'>
          <Story />
        </div>
      </MockStore>
    ),
  ],
  args: {
    ...Default.args,
  },
};

export const ValidationError = {
  decorators: [
    (Story) => (
      <MockStore>
        <div className='w-125 p-4 bg-slate-50 rounded-lg'>
          <Story />
        </div>
      </MockStore>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Klik submit tanpa isi teks', async () => {
      const submitButton = canvas.getByRole('button');
      await userEvent.click(submitButton);
    });
  },
};
