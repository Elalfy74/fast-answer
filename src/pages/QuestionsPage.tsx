import { useEffect, useState } from "react";

import { CircularProgress, Stack } from "@mui/material";
import { Question, QuestionHeader } from "../components";
import { QuestionType } from "../components/Question.types";
import { Loading } from "../data/types";
import { getAllQuestions } from "../services/questions";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([] as QuestionType[]);
  const [loading, setLoading] = useState("idle" as Loading);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [lastDoc, setLastDoc] = useState(
    null as QueryDocumentSnapshot<DocumentData> | null
  );

  const getNextQuestions = async () => {
    const data = await getAllQuestions(lastDoc, setLastDoc, setLoading);

    setQuestions((oldQuestions) => [...oldQuestions, ...data]);
  };

  useEffect(() => {
    getNextQuestions();
  }, [reachedBottom]);

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setReachedBottom(true);
    }
  };

  return (
    <Stack
      className="stack-container"
      direction="column"
      alignItems="center"
      spacing={4}
    >
      {/* <QuestionHeader /> */}

      {questions.length > 0 &&
        questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}

      {loading === "pending" && <CircularProgress />}
    </Stack>
  );
};

export default QuestionsPage;
