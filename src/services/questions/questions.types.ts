import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore';

import { Tag } from '../../data/global.types';

export type SaveQuestionParams = {
  authorId?: string;
  title: string;
  body: string;
  tags: Tag[];
};

export type FormatedQuestion = Omit<SaveQuestionParams, 'authorId' | 'tags'> & {
  author?: DocumentReference<DocumentData>;
  tags: DocumentReference<DocumentData>[];
  creationTime: Timestamp;
};

export enum BookMarkAction {
  ADD,
  REMOVE,
}

export type SaveBookMarkParams = {
  userId: string;
  questionId: string;
  action: BookMarkAction;
};
