// types/resumeTypes.ts
export type CommentType = {
  id: number;
  text: string;
  isImportant: boolean;
  resumeId: number;
};

export type ResumeType = {
  id: number;
  img: string;
  fullName: string;
  birthDate: Date;
  about: string;
  technologies: string[];
  achievments: string[];
  education: string;
  prefered: string;
  phone: string;
  telegram: string;
  git: string;
  email: string;
  salary: number;
  Comments: CommentType[];
};
