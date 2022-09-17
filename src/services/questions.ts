import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
} from 'firebase/firestore';

import { QuestionType } from '../data/types';
import { db } from '../firebase-config';
import { formatAllQuestions, formatQuestion } from './questions-helpers';

const questionsCollectionRef = collection(db, 'questions');
// global variable so doesn't get reinitialized on every call
let lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;

// Start Of APIS

// Get All Questions API
export const getAllQuestions = async () => {
  const numberOfQuestions = 6;
  let hasMore: boolean;
  let requestQuery: Query<DocumentData>;

  if (lastDoc) {
    requestQuery = query(
      questionsCollectionRef,
      orderBy('creationTime'),
      startAfter(lastDoc),
      limit(numberOfQuestions)
    );
  } else {
    requestQuery = query(
      questionsCollectionRef,
      orderBy('creationTime'),
      limit(numberOfQuestions)
    );
  }

  const questionsFromServer = await getDocs(requestQuery);
  lastDoc = questionsFromServer.docs[questionsFromServer.docs.length - 1];

  const questionsList: QuestionType[] = await formatAllQuestions(
    questionsFromServer.docs
  );

  if (questionsFromServer.docs.length < numberOfQuestions) {
    hasMore = false;
  } else {
    hasMore = true;
  }

  return {
    items: questionsList,
    hasMore,
  };
};

// Save Question API
export const saveQuestion = async (
  uId: string,
  question: any,
  tags: any,
  votesArray: any
) => {
  const formatedQuestion = {
    ...question,
    creationTime: Timestamp.fromDate(new Date()),
    tags: tags.map((tag: string) => doc(db, 'tags', tag)),
    author: doc(db, 'users', uId),
    votes: votesArray,
  };

  await addDoc(questionsCollectionRef, formatedQuestion);
};

// Get Question By Id API
export const getQuestionById = async (id: string) => {
  const questionDoc = doc(db, 'questions', id);

  const questionFromServer = await getDoc(questionDoc);
  if (!questionFromServer.data()) {
    throw new Error('Question Not Found');
  }
  const question = await formatQuestion(questionFromServer);
  return question;
};
// End Of APIS

export const getAllQuestionsIds = async () => {
  const questions = await getDocs(questionsCollectionRef);
  const ids: string[] = [];
  questions.forEach((question) => {
    ids.push(question.id);
  });
  return ids;
};

export const getAllQuestionsTest = async () => {
  console.log('here');

  const numberOfQuestions = 6;
  let hasMore: boolean;
  let requestQuery: Query<DocumentData>;

  if (lastDoc) {
    requestQuery = query(
      questionsCollectionRef,
      orderBy('creationTime'),
      startAfter(lastDoc),
      limit(numberOfQuestions)
    );
  } else {
    requestQuery = query(
      questionsCollectionRef,
      orderBy('creationTime'),
      limit(numberOfQuestions)
    );
  }
  console.log('here');
  const questionsFromServer = await getDocs(requestQuery);
  console.log(questionsFromServer);
  return null;
  // lastDoc = questionsFromServer.docs[questionsFromServer.docs.length - 1];

  // const questionsList: QuestionType[] = await formatAllQuestions(
  //   questionsFromServer.docs
  // );

  // if (questionsFromServer.docs.length < numberOfQuestions) {
  //   hasMore = false;
  // } else {
  //   hasMore = true;
  // }

  // return {
  //   items: questionsList,
  //   hasMore,
  // };
};
