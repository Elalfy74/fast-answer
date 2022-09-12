import { useEffect, useState } from "react";

import {
  Box,
  Pagination,
  CircularProgress,
  Skeleton,
  Stack,
} from "@mui/material";
import { Question, QuestionHeader } from "../components";
import { QuestionType } from "../components/Question.types";
import { Loading } from "../data/types";
import { getAllQuestions } from "../services/questions";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([] as QuestionType[]);
  const [loading, setLoading] = useState("idle" as Loading);
  const [lastDoc, setLastDoc] = useState(
    null as QueryDocumentSnapshot<DocumentData> | null
  );

  const getNextQuestions = async () => {
    const data = await getAllQuestions(lastDoc, setLastDoc, setLoading);

    setQuestions((oldQuestions) => [...oldQuestions, ...data]);
  };

  const handleScroll = (e: any) => {
    const container = e.target as HTMLElement;
    let triggerHeight = container.scrollTop + container.offsetHeight;
    if (triggerHeight >= container.scrollHeight && loading !== "finished") {
      getNextQuestions();
    }
  };

  useEffect(() => {
    getNextQuestions();
  }, []);

  return (
    <Stack
      className="stack-container"
      direction="column"
      alignItems="center"
      maxHeight="80%"
      spacing={4}
      overflow="auto"
      onScroll={handleScroll}
    >
      {/* <QuestionHeader /> */}

      {questions.length > 0 &&
        questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}

      {loading === "pending" && (
        <CircularProgress />
        // <Skeleton variant="rounded" width={"100%"} height={118} />
      )}
    </Stack>
  );
};

export default QuestionsPage;
