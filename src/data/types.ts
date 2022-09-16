import { DocumentData, DocumentReference } from 'firebase/firestore';

export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed' | 'finished';

export type User = {
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

export type QuestionType = {
  id: string;
  title: string;
  body: string;
  creationTime: string;
  // author: {
  //   authorId: string;
  //   authorName: string;
  //   avatar?: string;
  // };
  authorId: any;
  tags: Tag[];
};

export type Tag = {
  id: string;
  name: string;
};

export type ReceivedQuestionType = Omit<QuestionType, 'tags'> & {
  tags: DocumentReference<DocumentData>[];
  creationTime: {
    seconds: number;
    nanoseconds: number;
  };
  authorId: DocumentReference<DocumentData>;
};
