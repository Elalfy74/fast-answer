import { db } from "../firebase-config";
import { collection, getDocs, getDoc } from "@firebase/firestore";
import { QuestionType, Tag } from "../components/Question.types";

const questionsCollectionRef = collection(db, "questions");

export const getAllQuestions = async () => {
  const questionsFromServer = await getDocs(questionsCollectionRef);

  const questionsList: QuestionType[] = questionsFromServer.docs.map((doc) => {
    const question = { ...doc.data(), id: doc.id } as QuestionType;
    const tags: Tag[] = [];

    question.tags.map(async (tag: any) => {
      let tagData = await getDoc(tag);

      tags.push({ ...(tagData.data() as Object), id: doc.id } as Tag);
    });

    question.tags = tags;
    console.log(question.creationTime);
    return question;
  });

  return questionsList;
};
