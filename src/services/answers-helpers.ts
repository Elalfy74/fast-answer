import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import moment from 'moment';

import { AnswerType, RececviedAnswerType } from '../data/types';
import { getUserByRef } from './users';

export const formatAnswer = async (
  answer: QueryDocumentSnapshot<DocumentData>
) => {
  const answerData = {
    ...answer.data(),
    id: answer.id,
  } as RececviedAnswerType;

  const author = await getUserByRef(answerData.author);

  const formatedDate = moment.unix(answerData.creationTime.seconds).fromNow();

  return {
    ...answerData,
    author,
    creationTime: formatedDate,
  } as AnswerType;
};

// Helper Frunction To Get User Data
// And Get Number of up and Down Votes
export const formatAllAnswers = async (
  answersDocs: QueryDocumentSnapshot<DocumentData>[]
) => {
  const answersList: AnswerType[] = [];

  await Promise.all(
    answersDocs.map(async (answer) => {
      const formatedAnswer = await formatAnswer(answer);
      answersList.push(formatedAnswer);
    })
  );

  for (let i = 0; i < answersList.length; i++) {
    // Assign upVotes and downVotes
    answersList[i].upVotes =
      answersList[i].votes?.filter((vote) => vote.value === 'up').length || 0;
    answersList[i].downVotes =
      answersList[i].votes?.filter((vote) => vote.value === 'down').length || 0;
  }

  return answersList;
};
