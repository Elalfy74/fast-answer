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
// let lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;

// Start Of APIS

// Get All Questions API
export const getAllQuestions = async (last: {
  doc?: QueryDocumentSnapshot<DocumentData> | null;
  setLast: React.Dispatch<
    React.SetStateAction<QueryDocumentSnapshot<DocumentData> | null>
  >;
}) => {
  const numberOfQuestions = 6;

  let requestQuery: Query<DocumentData>;
  let hasMore: boolean;

  if (last.doc) {
    requestQuery = query(
      questionsCollectionRef,
      orderBy('creationTime'),
      startAfter(last.doc),
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
  last.setLast(questionsFromServer.docs[questionsFromServer.docs.length - 1]);

  const questionsList: QuestionType[] = await formatAllQuestions(
    questionsFromServer.docs
  );

  if (questionsFromServer.empty) {
    hasMore = false;
    return {
      items: [],
      hasMore,
    };
  }

  hasMore = true;
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
