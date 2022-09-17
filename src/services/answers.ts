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

import { AnswerType, RececviedAnswerType } from '../data/types';
import { db } from '../firebase-config';
import { formatAllAnswers } from './answers-helpers';
import { getUserByRef } from './users';

const answersCollectionRef = collection(db, 'answers');

// Start Of APIS
export const getAllAnswersOfQuestion = async (questionId: string) => {
  const questionRef = doc(db, 'questions', questionId);

  const answersQuery = query(
    answersCollectionRef,
    where('question', '==', questionRef),
    orderBy('creationTime', 'desc')
    // limit(6)
  );

  const answersFromServer = await getDocs(answersQuery);

  const answersList = await formatAllAnswers(answersFromServer.docs);

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
