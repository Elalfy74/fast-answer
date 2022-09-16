// Save Answer API

import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';

import { db } from '../firebase-config';
import { getUserByRef } from './users';

const answersCollectionRef = collection(db, 'answers');

export const getAllAnswersOfQuestion = async (questionId: string) => {
  const questionRef = doc(db, 'questions', questionId);

  const answersQuery = query(
    answersCollectionRef,
    where('question', '==', questionRef)
    // orderBy('creationTime'),
    // limit(6)
  );

  const answersFromServer = await getDocs(answersQuery);

  const answersDocs = answersFromServer.docs;

  const answersList = [];

  for (let i = 0; i < answersDocs.length; i++) {
    const author = await getUserByRef(answersDocs[i].data().author);
    answersList.push({ ...answersDocs[i].data(), author });
  }

  return answersList;

  // return answersFromServer.docs.map((answerDoc) => ({
  //   id: answerDoc.id,
  //   ...answerDoc.data(),
  // }));
};
export const saveAnswer = async (
  uId: string,
  questionId: string,
  body: string
) => {
  await addDoc(answersCollectionRef, {
    body,
    creationTime: Timestamp.fromDate(new Date()),
    question: doc(db, 'questions', questionId),
    author: doc(db, 'users', uId),
    upVotes: 0,
    downVotes: 0,
  });
};
