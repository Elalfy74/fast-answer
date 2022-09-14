import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import {
  QuestionType,
  ReceivedQuestionType,
  Tag,
} from '../components/Question.types';
import { getTags } from './tags';

// Functions replaces tags reference with real tags data for a single question
export const formatQuestion = async (
  question: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>
) => {
  const questionData = {
    ...question.data(),
    id: question.id,
  } as ReceivedQuestionType;

  const tags: Tag[] = await getTags(questionData.tags);

  return { ...questionData, tags };
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
