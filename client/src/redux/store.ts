import { configureStore } from '@reduxjs/toolkit';
import resumesReducer from './Resumes/ResumeSlice';
import commentsReducer from './Comments/CommentsSlice';

export const store = configureStore({
  reducer: {
    resumes: resumesReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
