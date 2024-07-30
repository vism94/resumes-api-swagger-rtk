import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.number().int(),
  text: z.string(),
  isImportant: z.boolean().optional(),
  resumeId: z.number().int(),
});

export const ResumeSchema = z.object({
  id: z.number().int(),
  img: z.string(),
  fullName: z.string(),
  birthDate: z.string(),
  about: z.string(),
  technologies: z.array(z.string()),
  achievments: z.array(z.string()),
  education: z.string(),
  position: z.string(),
  prefered: z.string(),
  phone: z.string(),
  telegram: z.string(),
  git: z.string(),
  email: z.string(),
  salary: z.number().int().nonnegative(),
  Comments: z.array(CommentSchema), // Привязываем CommentSchema к ResumeSchema
});

export const ResumesSchema = z.array(ResumeSchema);
