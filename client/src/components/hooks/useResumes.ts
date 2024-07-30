import { useEffect } from 'react';
import { createResumeThunk, deleteResumeThunk, editResumeThunk, getResumesThunk } from '../../redux/Resumes/ResumeAsyncActions';
import type { EditResumeType, ResumeType } from '../../types/resumeTypes';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export default function useResumes(): {
  resumes: ResumeType[];
  ResumesSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteHandler: (id: ResumeType['id']) => void
  editHandler: ( obj: EditResumeType) => void
} {
  const resumes = useAppSelector((state) => state.resumes.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getResumesThunk());
  }, [dispatch]);

  const ResumesSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as ResumeType;
    void dispatch(createResumeThunk(data));
  };

  const deleteHandler = (id: ResumeType['id']): void => {
    void dispatch(deleteResumeThunk(id));
  }

  const editHandler = ( obj: EditResumeType): void => {
    void dispatch(editResumeThunk(obj));
  }

  return { resumes, ResumesSubmitHandler, deleteHandler, editHandler };
}
