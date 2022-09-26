import { DocumentData, DocumentReference } from 'firebase/firestore';

export type ChildrenProps = {
  children: React.ReactNode;
};

export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed' | 'finished';

export type User = {
  id: string;
  UserName?: string;
  FirstName: string;
  LastName?: string;
  Email: string;
  Bio?: string;
  UniversityLevel?: string;
  PhotoUrl?: string;
  College?: string;
  Major?: string;
  Birthdate?: string;
  // As My fake Data is already a string
  PhoneNumber?: string;
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
  creationTime: {
    seconds: number;
    nanoseconds: number;
  };
  votes?: Vote[];
  author: DocumentReference<DocumentData>;
};

export type QuestionType = Omit<
  ReceivedQuestionType,
  'author' | 'tags' | 'creationTime'
> & {
  author: User;
  tags: Tag[];
  answersNumber: number;
  creationTime: string;
  upVotes: number;
  downVotes: number;
};

export type RececviedAnswerType = {
  id: string;
  body: string;
  creationTime: {
    seconds: number;
    nanoseconds: number;
  };
  author: DocumentReference<DocumentData>;
  votes?: Vote[];
};

export type AnswerType = Omit<
  RececviedAnswerType,
  'author' | 'creationTime'
> & {
  author: User;
  creationTime: string;
  upVotes: number;
  downVotes: number;
};
