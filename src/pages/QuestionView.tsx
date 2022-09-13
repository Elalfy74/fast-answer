import { useEffect } from "react";
import { getQuestionById } from "../services/questions";
import useHttp from "../hooks/use-http";
import { CircularProgress, Stack } from "@mui/material";
import { Loading } from "../data/types";
import { Question } from "../components";
import { QuestionType } from "../components/Question.types";

const QuestionView = () => {
  const {
    sendRequest,
    loading,
    data: question,
    error,
  } = useHttp(getQuestionById, true);

  useEffect(() => {
    const getQuestion = async () => {
      await sendRequest("");
    };
    getQuestion();
  }, []);
  return (
    <Stack alignItems="center">
      {loading === "pending" && <CircularProgress />}
      {loading === "succeeded" && (
        <Question question={question as QuestionType} />
      )}
      {loading === "failed" && <p>{error}</p>}
    </Stack>
  );
};

export default QuestionView;
