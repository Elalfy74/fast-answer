import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import moment from 'moment';

import { QuestionType, ReceivedQuestionType, Tag } from '../data/types';
import { getTags } from './tags';
import { getUserByRef } from './users';

// Functions replaces tags reference with real tags and author with real author data for a single question
export const formatQuestion = async (
  question: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>
) => {
  const questionData = {
    ...question.data(),
    id: question.id,
  } as ReceivedQuestionType;

  const formatedDate = moment.unix(questionData.creationTime.seconds).fromNow();

  const tags: Tag[] = await getTags(questionData.tags);

  const author = await getUserByRef(questionData.authorId);

  return {
    ...questionData,
    authorId: author,
    tags,
    creationTime: formatedDate,
  };
};

// Functions replaces tags reference with real tags data for a all questions
export const formatQuestions = async (
  questions: QueryDocumentSnapshot<DocumentData>[]
) => {
  const result: QuestionType[] = [];

  for (let i = 0; i < questions.length; i++) {
    result.push(await formatQuestion(questions[i]));
  }
  return result;
};
