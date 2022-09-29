import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import { QueryFunctionContext } from 'react-query';

import { QuestionType, Tag } from '../data/types';
import { db } from '../firebase-config';
import { getLastThreeDaysDate } from '../utils/last-week-date';
import { formatAllQuestions, formatQuestion } from './questions-helpers';

const questionsCollectionRef = collection(db, 'questions');

// Start Of APIS

let lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;
// Get All Questions API
export const getAllQuestions = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}) => {
  const numberOfQuestions = 6;

  if (pageParam === 1) {
    lastDoc = null;
  }

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
  authorId?: string;
  title: string;
  body: string;
  tags: Tag[];
};

type FormatedQuestion = Omit<QuestionParams, 'authorId' | 'tags'> & {
  author?: DocumentReference<DocumentData>;
  tags: DocumentReference<DocumentData>[];
  creationTime: Timestamp;
};

export const saveQuestion = async (params: QuestionParams) => {
  const { authorId, title, body, tags } = params;

  const currentTime = Timestamp.fromDate(new Date());

  const formatedQuestion: FormatedQuestion = {
    title,
    body,
    creationTime: currentTime,
    tags: tags.map((tag: Tag) => doc(db, 'tags', tag.id)),
  };

  if (authorId) {
    formatedQuestion.author = doc(db, 'users', authorId);
  }

  const savedQuestion = await addDoc(questionsCollectionRef, formatedQuestion);

  let authorData;

  if (authorId) {
    authorData = await getDoc(doc(db, 'users', authorId));
  }
  const formatedDate = moment.unix(currentTime.seconds).fromNow();

  return {
    ...formatedQuestion,
    author: authorId && authorData && authorData.data(),
    creationTime: formatedDate,
    id: savedQuestion.id,
    tags,
    upVotes: 0,
    downVotes: 0,
  } as QuestionType;
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

export const getFeaturedQuestions = async () => {
  const q = query(
    questionsCollectionRef,
    where('creationTime', '>', getLastThreeDaysDate()),
    orderBy('creationTime', 'desc')
  );
  const questionsFromServer = await getDocs(q);
  const questionsList: QuestionType[] = await formatAllQuestions(
    questionsFromServer.docs
  );

  questionsList.sort((a, b) => a.upVotes - b.upVotes);

  questionsList.splice(3);

  return questionsList;
};
