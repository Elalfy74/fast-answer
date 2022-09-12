import { db } from "../firebase-config";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { Loading } from "../data/types";
import { QuestionType, Tag } from "../components/Question.types";
import {
  DocumentData,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";

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

  const questionsList: QuestionType[] = questionsFromServer.docs.map((doc) => {
    const question = { ...doc.data(), id: doc.id } as QuestionType;
    const tags: Tag[] = [];

    question.tags.map(async (tag: any) => {
      let tagData = await getDoc(tag);

      tags.push({ ...(tagData.data() as Object), id: doc.id } as Tag);
    });

    question.tags = tags;

    return question;
  });
  setLoading("succeeded");
  return questionsList;
};
