import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore';

export type SaveAnswerParams = {
  authorId?: string;
  questionId: string;
  body: string;
};

export type NewAnswer = Omit<SaveAnswerParams, 'authorId' | 'questionId'> & {
  author?: DocumentReference<DocumentData>;
  creationTime: Timestamp;
  question: DocumentReference<DocumentData>;
};
