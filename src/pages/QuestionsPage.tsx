import { useEffect, useState, useCallback } from "react";

import { CircularProgress, Stack } from "@mui/material";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Question, QuestionHeader } from "../components";
import { QuestionType } from "../components/Question.types";
import { Loading } from "../data/types";
import { getAllQuestions } from "../services/questions";

function QuestionsPage() {
  const [questions, setQuestions] = useState([] as QuestionType[]);
  const [loading, setLoading] = useState("idle" as Loading);
  const [paginationTrigger, setPaginationTrigger] = useState(false);
  const [lastDoc, setLastDoc] = useState(
    null as QueryDocumentSnapshot<DocumentData> | null
  );

  const getNextQuestions = useCallback(async () => {
    const data = await getAllQuestions(lastDoc, setLastDoc, setLoading);

    setQuestions((oldQuestions) => [...oldQuestions, ...data]);
  }, [lastDoc]);

  useEffect(() => {
    getNextQuestions();
  }, [paginationTrigger, getNextQuestions]);

  window.onscroll = () => {
    const scrollHeight =
      window.innerHeight + document.documentElement.scrollTop + 70;
    const offSet = document.documentElement.offsetHeight;
    if (
      scrollHeight >= offSet &&
      loading !== "finished" &&
      loading !== "pending"
    ) {
      setPaginationTrigger((prevState) => !prevState);
    }
  };

  return (
    <Stack direction="column" alignItems="center" spacing={4}>
      {/* <QuestionHeader /> */}

      {questions.length > 0 &&
        questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}

      {loading === "pending" && <CircularProgress />}
    </Stack>
  );
}

export default QuestionsPage;
