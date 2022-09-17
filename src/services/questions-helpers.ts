import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import moment from 'moment';

import { QuestionType, ReceivedQuestionType, Tag } from '../data/types';
import { getVotesNumber } from '../utils/votes';
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

  const author = await getUserByRef(questionData.author);

  let upVotes = 0;
  let downVotes = 0;

  if (questionData.votes) {
    upVotes = getVotesNumber('up', questionData.votes);
    downVotes = getVotesNumber('down', questionData.votes);
  }

  return {
    ...questionData,
    author,
    tags,
    creationTime: formatedDate,
    upVotes,
    downVotes,
  } as QuestionType;
};

// Functions replaces tags reference with real tags data for a all questions
export const formatAllQuestions = async (
  questions: QueryDocumentSnapshot<DocumentData>[]
) => {
  const result: QuestionType[] = [];

  for (let i = 0; i < questions.length; i++) {
    result.push(await formatQuestion(questions[i]));
  }
  return result;
};
