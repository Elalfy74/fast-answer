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
import { QueryFunctionContext } from 'react-query';

import { QuestionType, Tag } from '../data/types';
import { db } from '../firebase-config';
import { formatAllQuestions, formatQuestion } from './questions-helpers';

const questionsCollectionRef = collection(db, 'questions');

// Start Of APIS

let lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;
// Get All Questions API
export const getAllQuestions = async () => {
  const numberOfQuestions = 6;

  let requestQuery: Query<DocumentData>;

  if (lastDoc) {
    requestQuery = query(
      questionsCollectionRef,
      orderBy('creationTime', 'desc'),
      startAfter(lastDoc),
      limit(numberOfQuestions)
    );
  } else {
    requestQuery = query(
      questionsCollectionRef,
      orderBy('creationTime', 'desc'),
      limit(numberOfQuestions)
    );
  }

  const questionsFromServer = await getDocs(requestQuery);
  lastDoc = questionsFromServer.docs[questionsFromServer.docs.length - 1];

  const questionsList: QuestionType[] = await formatAllQuestions(
    questionsFromServer.docs
  );

  if (questionsFromServer.empty) {
    return [];
  }

  return questionsList;
};

// Save Question API
type QuestionParams = {
  authorId: string;
  title: string;
  body: string;
  tags: Tag[];
};
export const saveQuestion = async (params: QuestionParams) => {
  const { authorId, title, body, tags } = params;

  const currentTime = Timestamp.fromDate(new Date());

  const formatedQuestion = {
    author: doc(db, 'users', authorId),
    title,
    body,
    creationTime: currentTime,
    tags: tags.map((tag: Tag) => doc(db, 'tags', tag.id)),
  };

  const savedQuestion = await addDoc(questionsCollectionRef, formatedQuestion);

  return {
    ...formatedQuestion,
    id: savedQuestion.id,
    tags,
  };
};

export const saveFakeQuestion = async (
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
export const getQuestionById = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null | undefined]>) => {
  const questionId = queryKey[1]!;

  const questionDoc = doc(db, 'questions', questionId);

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
