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

import { AnswerType, RececviedAnswerType } from '../data/types';
import { db } from '../firebase-config';
import { getLastThreeDaysDate } from '../utils/last-week-date';
import { formatAllAnswers } from './answers-helpers';
import { getUserByRef } from './users';

const answersCollectionRef = collection(db, 'answers');

// Start Of APIS
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

// The answers with the users
export const getAllAnswersOfQuestion = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null | undefined]>) => {
  const qId = queryKey[1]!;

  const answersFromServer = await getAnswersOfQuestion(qId);

  const answersList = await formatAllAnswers(answersFromServer);

  return answersList;
};

export const saveAnswer = async ({
  authorId,
  questionId,
  body,
}: {
  authorId: string;
  questionId: string;
  body: string;
}) => {
  const newAnswer = {
    creationTime: Timestamp.fromDate(new Date()),
    body,
    question: doc(db, 'questions', questionId),
    author: doc(db, 'users', authorId),
  };

  const savedAnswer = await addDoc(answersCollectionRef, newAnswer);

  const author = await getUserByRef(newAnswer.author);

  return {
    ...newAnswer,
    id: savedAnswer.id,
    author,
    creationTime: moment.unix(newAnswer.creationTime.seconds).fromNow(),
    upVotes: 0,
    downVotes: 0,
  } as AnswerType;
};

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
