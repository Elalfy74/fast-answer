import {
  addDoc,
  collection,
  doc,
  getDocs,
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
    where('question', '==', questionRef)
    // orderBy('creationTime'),
    // limit(6)
  );

  const answersFromServer = await getDocs(answersQuery);

  const answersList = await formatAllAnswers(answersFromServer.docs);

  return answersList;
};

export const saveAnswer = async (
  uId: string,
  questionId: string,
  body: string,
  votesArray: { type: string; userId: string }[]
) => {
  await addDoc(answersCollectionRef, {
    body,
    creationTime: Timestamp.fromDate(new Date()),
    question: doc(db, 'questions', questionId),
    author: doc(db, 'users', uId),
    votes: votesArray,
  });
};
