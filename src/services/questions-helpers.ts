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

export const formatQuestion = async (
  question: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>
) => {
  const questionData = {
    ...question.data(),
    id: question.id,
  // eslint-disable-next-line prettier/prettier
  } as ReceivedQuestionType;

  const tags: Tag[] = await getTags(questionData.tags);

  return { ...questionData, tags };
};

export const formatQuestions = async (
  questions: QueryDocumentSnapshot<DocumentData>[]
) => {
  const result: QuestionType[] = [];

  for (let i = 0; i < questions.length; i++) {
    result.push(await formatQuestion(questions[i]));
  }
  return Promise.all(result);
};
