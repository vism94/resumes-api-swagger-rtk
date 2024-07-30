import axios from 'axios';
import { ResumeSchema, ResumesSchema, CommentSchema } from '../utils/validators';
import type { ApiResponce, ResumeType, ResumeDataType, CommentType } from '../types/resumeTypes';

class ResumeService {
  private api = axios.create({ baseURL: '/api' });

  async getResumes(): Promise<ApiResponce> {
    const { data } = await this.api.get<ApiResponce>('/resumes');
    return ResumesSchema.parse(data);
  }

  async getResumeById(id: number): Promise<ResumeType> {
    const { data } = await this.api.get<ResumeType>(`/resumes/${id}`);
    return ResumeSchema.parse(data);
  }

  async addTask(obj: ResumeDataType): Promise<ResumeType> {
    const { data } = await this.api.post<ResumeType>('/resumes', obj);
    return ResumeSchema.parse(data);
  }

  async deleteResume(id: number): Promise<void> {
    await this.api.delete(`/resumes/${id}`);
  }

  async editResume(id: number, obj: ResumeDataType): Promise<ResumeType> {
    const { data } = await this.api.patch<ResumeType>(`/resumes/${id}`, obj);
    return ResumeSchema.parse(data);
  }

  async addComment(comment: { resumeId: number; text: string; isImportant: boolean }): Promise<CommentType> {
    const { data } = await this.api.post<CommentType>(`/resumes/${comment.resumeId}/comments`, comment);
    return CommentSchema.parse(data);
  }

  async updateComment(id: number, isImportant: boolean): Promise<CommentType> {
    const { data } = await this.api.patch<CommentType>(`/comments/${id}`, { isImportant });
    return CommentSchema.parse(data);
  }

  async deleteComment(id: number): Promise<void> {
    await this.api.delete(`/comments/${id}`);
  }

  async acceptResume(id: number): Promise<void> {
    await this.api.post(`/resumes/${id}/accept`);
  }
}

export default new ResumeService();
