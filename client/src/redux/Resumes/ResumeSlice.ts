import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { ResumeType, CommentType, ResumeDataType } from '../../types/resumeTypes';
import ResumeService from '../../services/ResumeService';

interface ResumesState {
  data: ResumeType[];
  loading: boolean;
  error: string | null;
}

const initialState: ResumesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchResumes = createAsyncThunk<ResumeType[]>('resumes/fetchAll', async () => {
  return await ResumeService.getResumes();
});

export const fetchResumeById = createAsyncThunk<ResumeType, number>('resumes/fetchById', async (id) => {
  return await ResumeService.getResumeById(id);
});

export const addComment = createAsyncThunk<CommentType, { resumeId: number; text: string; isImportant: boolean }>('comments/add', async (comment) => {
  return await ResumeService.addComment(comment);
});

export const updateComment = createAsyncThunk<CommentType, { id: number; isImportant: boolean }>('comments/update', async ({ id, isImportant }) => {
  return await ResumeService.updateComment(id, isImportant);
});

export const deleteComment = createAsyncThunk<void, number>('comments/delete', async (id) => {
  await ResumeService.deleteComment(id);
});

export const acceptResume = createAsyncThunk<void, number>('resumes/accept', async (id) => {
  await ResumeService.acceptResume(id);
});

const resumesSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch resumes';
      })
      .addCase(fetchResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumeById.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.data.findIndex((resume) => resume.id === payload.id);
        if (index !== -1) {
          state.data[index] = payload;
        } else {
          state.data.push(payload);
        }
      })
      .addCase(fetchResumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch resume';
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        const resume = state.data.find((r) => r.id === payload.resumeId);
        if (resume) {
          resume.Comments.push(payload);
        }
      })
      .addCase(updateComment.fulfilled, (state, { payload }) => {
        const resume = state.data.find((r) => r.id === payload.resumeId);
        if (resume) {
          const comment = resume.Comments.find((c) => c.id === payload.id);
          if (comment) {
            comment.isImportant = payload.isImportant;
          }
        }
      })
      .addCase(deleteComment.fulfilled, (state, { meta }) => {
        const resume = state.data.find((r) => r.id === meta.arg);
        if (resume) {
          resume.Comments = resume.Comments.filter((c) => c.id !== meta.arg);
        }
      })
      .addCase(acceptResume.fulfilled, (state, { meta }) => {
        const resume = state.data.find((r) => r.id === meta.arg);
        if (resume) {
          resume.isAccepted = true;
        }
      });
  },
});

export default resumesSlice.reducer;
