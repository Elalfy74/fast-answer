import { DocumentData, DocumentReference } from 'firebase/firestore';

export type QuestionType = {
  id: string,
  title: string,
  body: string,
  creationTime: string,
  author: {
    authorId: string,
    authorName: string,
    avatar?: string,
  },
  tags: Tag[],
};

export type Tag = {
  id: string,
  name: string,
};

export type ReceivedQuestionType = Omit<QuestionType, 'tags'> & {
  tags: DocumentReference<DocumentData>[],
};
