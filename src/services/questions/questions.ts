import {
  addDoc,
  arrayRemove,
  arrayUnion,
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
  updateDoc,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import { QueryFunctionContext } from 'react-query';

import { QuestionType, Tag } from '../../data/global.types';
import { db } from '../../firebase-config';
import { getLastThreeDaysDate } from '../../utils/last-three-days';
import {
  BookMarkAction,
  FormatedQuestion,
  SaveBookMarkParams,
  SaveQuestionParams,
} from './questions.types';
import { formatAllQuestions, formatQuestion } from './questions-helpers';

const questionsCollectionRef = collection(db, 'questions');

// *********** APIS ***********

// *************** QUESTIONS ************** //
let lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;
// GET All Questions API
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

// GET Question By Id API
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

// GET Featured Questions
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

// POST Question API
export const saveQuestion = async (params: SaveQuestionParams) => {
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

// *************** BOOKMARKS ************** //
// BookMark GET
export const getBookMarks = async (userId: string) => {
  const q = query(
    questionsCollectionRef,
    where('bookMarkers', 'array-contains', userId)
  );

  const questionsFromServer = await getDocs(q);

  const questionsList: QuestionType[] = await formatAllQuestions(
    questionsFromServer.docs
  );

  return questionsList;
};

// BookMark POST
export const handleBookMark = async ({
  userId,
  questionId,
  action,
}: SaveBookMarkParams) => {
  const questionRef = doc(db, 'questions', questionId);

  const result = await updateDoc(questionRef, {
    bookMarkers:
      action === BookMarkAction.ADD ? arrayUnion(userId) : arrayRemove(userId),
  });

  return result;
};

// GET ALL Questions ID -- FAKE PURPOSE
export const getAllQuestionsIds = async () => {
  const questions = await getDocs(questionsCollectionRef);
  const ids: string[] = [];
  questions.forEach((question) => {
    ids.push(question.id);
  });
  return ids;
};

// POST Question -- FAKE PURPOSE
export const saveFakeQuestion = async (
  uId: string,
  question: any,
  tags: any,
  votesArray: any
) => {
  // console.log(uId, question, tags, votesArray);

  const formatedQuestion = {
    ...question,
    creationTime: Timestamp.fromDate(new Date()),
    tags: tags.map((tag: string) => doc(db, 'tags', tag)),
    author: doc(db, 'users', uId),
    votes: votesArray,
  };

  await addDoc(questionsCollectionRef, formatedQuestion);
};
