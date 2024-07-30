import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { CommentType } from '../../types/resumeTypes';

interface CommentsState {
  importantComments: CommentType[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  importantComments: [],
  loading: false,
  error: null,
};

export const fetchImportantComments = createAsyncThunk<CommentType[]>('comments/fetchImportant', async () => {
  const response = await axios.get<CommentType[]>('/api/comments/important');
  return response.data;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImportantComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImportantComments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.importantComments = payload;
      })
      .addCase(fetchImportantComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch important comments';
      });
  },
});

export default commentsSlice.reducer;
