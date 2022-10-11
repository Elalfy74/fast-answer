import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import { QueryFunctionContext } from 'react-query';

import { AnswerType, RececviedAnswerType } from '../../data/global.types';
import { db } from '../../firebase-config';
import { getLastThreeDaysDate } from '../../utils/last-three-days';
import { getUserById } from '../users/users';
import { NewAnswer, SaveAnswerParams } from './answers.types';
import { formatAllAnswers } from './answers-helpers';

const answersCollectionRef = collection(db, 'answers');

// *********** APIS ***********

// GET Answers
// Only the docs
export const getAnswersOfQuestion = async (qId: string) => {
  const questionRef = doc(db, 'questions', qId);

  const answersQuery = query(
    answersCollectionRef,
    where('question', '==', questionRef),
    orderBy('creationTime', 'desc')
  );

  const answersFromServer = await getDocs(answersQuery);

  return answersFromServer.docs;
};

// GET Answers
// The answers with the authors
export const getAllAnswersOfQuestion = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null | undefined]>) => {
  const qId = queryKey[1]!;

  const answersFromServer = await getAnswersOfQuestion(qId);

  const answersList = await formatAllAnswers(answersFromServer);

  return answersList;
};

// GET Last Answers
export const getLastThreeDaysAnswers = async () => {
  const q = query(
    answersCollectionRef,
    where('creationTime', '>', getLastThreeDaysDate()),
    orderBy('creationTime', 'desc')
  );

  const answersFromServer = await getDocs(q);

  const answersList: RececviedAnswerType[] = answersFromServer.docs.map(
    (answerDoc) => {
      return {
        id: answerDoc.id,
        ...answerDoc.data(),
      } as RececviedAnswerType;
    }
  );

  return answersList;
};

// POST Add Answer
export const saveAnswer = async ({
  authorId,
  questionId,
  body,
}: SaveAnswerParams) => {
  const newAnswer: NewAnswer = {
    creationTime: Timestamp.fromDate(new Date()),
    body,
    question: doc(db, 'questions', questionId),
  };

  if (authorId) {
    newAnswer.author = doc(db, 'users', authorId);
  }

  const savedAnswer = await addDoc(answersCollectionRef, newAnswer);

  let author;

  if (authorId) {
    author = await getUserById(authorId);
  }

  return {
    ...newAnswer,
    id: savedAnswer.id,
    author,
    creationTime: moment.unix(newAnswer.creationTime.seconds).fromNow(),
    upVotes: 0,
    downVotes: 0,
  } as AnswerType;
};
