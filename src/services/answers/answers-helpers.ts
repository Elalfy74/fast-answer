import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import moment from 'moment';
import PQueue from 'p-queue';

import { AnswerType, RececviedAnswerType } from '../../data/global.types';
import { getVotesNumber } from '../../utils/votes';
import { getUserByRef } from '../users/users';

export const queue = new PQueue({ concurrency: 1 });

export const formatAnswer = async (
  answer: QueryDocumentSnapshot<DocumentData>
) => {
  const answerData = {
    ...answer.data(),
    id: answer.id,
  } as RececviedAnswerType;

  let author;
  if (answerData.author) {
    author = await getUserByRef(answerData.author);
  }

  const formatedDate = moment.unix(answerData.creationTime.seconds).fromNow();

  let upVotes = 0;
  let downVotes = 0;

  if (answerData.votes) {
    upVotes = getVotesNumber('up', answerData.votes);
    downVotes = getVotesNumber('down', answerData.votes);
  }

  return {
    ...answerData,
    author,
    creationTime: formatedDate,
    upVotes,
    downVotes,
  } as AnswerType;
};

// Helper Frunction To Get User Data
// And Get Number of up and Down Votes
export const formatAllAnswers = async (
  answersDocs: QueryDocumentSnapshot<DocumentData>[]
) => {
  const answersList: AnswerType[] = [];

  await queue.addAll(
    answersDocs.map((answer) => {
      return async () => {
        const formatedAnswer = await formatAnswer(answer);
        answersList.push(formatedAnswer);
      };
    })
  );

  return answersList;
};
