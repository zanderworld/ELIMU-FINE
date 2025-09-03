export enum UserRole {
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  SCHOOL = 'School Admin',
  PARENT = 'Parent',
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  type: 'mcq' | 'true_false' | 'short_answer';
}

export interface Lesson {
  id: string;
  title: string;
  strand: string;
  subStrand: string;
  content: string;
  visualAidUrl?: string;
  quiz: QuizQuestion[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  studentName: string;
  submissionUrl?: string;
  submissionType: 'image' | 'text' | 'audio';
  grade?: string;
  feedback?: string;
}

export interface ForumPost {
  id: string;
  author: string;
  role: UserRole;
  title: string;
  content: string;
  replies: { author: string; content: string }[];
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'project';
  participants: number;
  leaderboard: { name: string; score: number }[];
}

export interface SharedResource {
  id: string;
  title: string;
  uploader: string;
  type: 'Lesson Plan' | 'Worksheet' | 'Textbook Chapter' | 'Assessment';
  subject: string;
  grade: string;
}
