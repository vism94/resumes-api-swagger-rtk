import { createAsyncThunk } from '@reduxjs/toolkit';
import ResumeService from '../../services/ResumeService';
import type { EditResumeType, ResumeDataType, ResumeType , ApiResponce } from '../../types/resumeTypes';

export const getResumesThunk = createAsyncThunk<ApiResponce>(
  'resumes/getAll',
  async () => {
    const data = await ResumeService.getResumes();
    return data;
  }
);

export const createResumeThunk = createAsyncThunk<ResumeType, ResumeDataType>(
  'tasks/create',
  async (data) => {
    const resume = await ResumeService.addTask(data);
    return resume;
  }
);

export const deleteResumeThunk = createAsyncThunk<ResumeType['id'], ResumeType['id']>(
  'tasks/delete',
  async (id) => {
    await ResumeService.deleteResume(id);
    return id;
  }
);

export const editResumeThunk = createAsyncThunk<ResumeType, EditResumeType>(
  'tasks/edit',
  async ({ id, data }) => {
    const resume = await ResumeService.editResume(id, data);
    return resume;
  }
);
