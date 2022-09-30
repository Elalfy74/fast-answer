import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore';

export type ChildrenProps = {
  children: React.ReactNode;
};

export type User = {
  id: string;
  userName?: string;
  firstName: string;
  lastName?: string;
  email: string;
  bio?: string;
  gender: 'male' | 'female';
  avatar?: string;
  country?: string;
  Birthdate?: string;
  jobTitle?: string;
  birthdate?: string;
  university?: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type Vote = {
  author: DocumentReference<DocumentData>;
  value: string;
};

export type ReceivedQuestionType = {
  id: string;
  title: string;
  body: string;
  tags: DocumentReference<DocumentData>[];
  creationTime: Timestamp;
  votes?: Vote[];
  author?: DocumentReference<DocumentData>;
};

export type QuestionType = Omit<
  ReceivedQuestionType,
  'author' | 'tags' | 'creationTime'
> & {
  author?: User;
  tags: Tag[];
  answersNumber: number;
  creationTime: string;
  upVotes: number;
  downVotes: number;
};

export type RececviedAnswerType = Omit<ReceivedQuestionType, 'title' | 'tags'>;

export type AnswerType = Omit<
  RececviedAnswerType,
  'author' | 'creationTime'
> & {
  author?: User;
  creationTime: string;
  upVotes: number;
  downVotes: number;
};
