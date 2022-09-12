import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  DocumentData,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  addDoc,
  Timestamp,
  doc,
} from "firebase/firestore";

import { Loading } from "../data/types";
import {
  QuestionType,
  receivedQuestionType,
  Tag,
} from "../components/Question.types";

import { getTags } from "./tags";
const questionsCollectionRef = collection(db, "questions");

export const getAllQuestions = async (
  lastDoc: QueryDocumentSnapshot<DocumentData> | null,
  setLastDoc: React.Dispatch<
    React.SetStateAction<QueryDocumentSnapshot<DocumentData> | null>
  >,
  setLoading: React.Dispatch<React.SetStateAction<Loading>>
) => {
  let numberOfQuestions = 6;
  let requestQuery;

  if (lastDoc) {
    requestQuery = query(
      questionsCollectionRef,
      orderBy("creationTime"),
      startAfter(lastDoc),
      limit(numberOfQuestions)
    );
  } else {
    requestQuery = query(
      questionsCollectionRef,
      orderBy("creationTime"),
      limit(numberOfQuestions)
    );
  }

  setLoading("pending");

  const questionsFromServer = await getDocs(requestQuery);

  setLastDoc(questionsFromServer.docs[questionsFromServer.docs.length - 1]);

  const questionsList: QuestionType[] = await formatQuestions(
    questionsFromServer.docs
  );

  if (questionsFromServer.docs.length < numberOfQuestions) {
    setLoading("finished");
  } else {
    setLoading("succeeded");
  }

  return questionsList;
};

const formatQuestions = async (
  questions: QueryDocumentSnapshot<DocumentData>[]
) => {
  let result: QuestionType[] = [];

  for (const ques of questions) {
    const question = await formatQuestion(ques);

    result.push(question);
  }
  return result;
};

const formatQuestion = async (
  question: QueryDocumentSnapshot<DocumentData>
) => {
  let questionData = {
    ...question.data(),
    id: question.id,
  } as receivedQuestionType;

  let tags: Tag[] = await getTags(questionData.tags);

  return { ...questionData, tags: tags };
};

export const saveQuestion = async (uId: string, question: any, tags: any) => {
  let formatedQuestion = {
    ...question,
    creationTime: Timestamp.fromDate(new Date()),
    tags: tags.map((tag: string) => doc(db, "tags", tag)),
    authorId: doc(db, "users", uId),
  };

  await addDoc(questionsCollectionRef, formatedQuestion);
};
