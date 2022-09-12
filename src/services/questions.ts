import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  QuerySnapshot,
  DocumentData,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";

import { Loading } from "../data/types";
import {
  QuestionType,
  receivedQuestionType,
  Tag,
} from "../components/Question.types";

const questionsCollectionRef = collection(db, "questions");

export const getAllQuestions = async (
  lastDoc: QueryDocumentSnapshot<DocumentData> | null,
  setLastDoc: React.Dispatch<
    React.SetStateAction<QueryDocumentSnapshot<DocumentData> | null>
  >,
  setLoading: React.Dispatch<React.SetStateAction<Loading>>
) => {
  let q;

  if (lastDoc) {
    q = query(
      questionsCollectionRef,
      orderBy("creationTime"),
      startAfter(lastDoc),
      limit(6)
    );
  } else {
    q = query(questionsCollectionRef, orderBy("creationTime"), limit(6));
  }

  setLoading("pending");

  const questionsFromServer = await getDocs(q);

  setLastDoc(questionsFromServer.docs[questionsFromServer.docs.length - 1]);

  if (questionsFromServer.empty) {
    setLoading("finished");
    return [];
  }

  let questionsList: QuestionType[] = await convertQuestions(
    questionsFromServer
  );

  setLoading("succeeded");
  return questionsList;
};

const convertQuestions = async (questions: QuerySnapshot<DocumentData>) => {
  let result: QuestionType[] = [];

  for (const q of questions.docs) {
    let question = { ...q.data(), id: q.id } as receivedQuestionType;

    let tags: Tag[] = [];

    for (const tag of question.tags) {
      let tagData = await getDoc(tag);
      tags.push({ ...tagData.data(), id: tagData.id } as Tag);
    }

    result.push({ ...question, tags: tags });
  }
  return result;
};
