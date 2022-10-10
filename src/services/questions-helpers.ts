import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import moment from 'moment';
import PQueue from 'p-queue';

import { QuestionType, ReceivedQuestionType, Tag } from '../data/global.types';
import { getVotesNumber } from '../utils/votes';
import { getAnswersOfQuestion } from './answers';
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

  let author;

  if (questionData.author) {
    author = await getUserByRef(questionData.author);
  }

  const answersNumber = await getAnswersOfQuestion(question.id);

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
    answersNumber: answersNumber.length,
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
  const queue = new PQueue({ concurrency: 1 });

  await queue.addAll(
    questions.map((question) => {
      return async () => {
        const formatedQuestion = await formatQuestion(question);
        result.push(formatedQuestion);
      };
    })
  );

  return result;
};
