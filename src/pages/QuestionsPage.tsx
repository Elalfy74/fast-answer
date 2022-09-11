import { useEffect, useState } from "react";

import { Box, Pagination, CircularProgress, Skeleton } from "@mui/material";
import { Question, QuestionHeader } from "../components";
import { QuestionType } from "../components/Question.types";
import { getAllQuestions } from "../services/questions";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([] as QuestionType[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllQuestions().then((questions) => {
      setIsLoading(false);
      setQuestions(questions);
    });
  }, []);

  // const [page, setPage] = useState(1);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* <QuestionHeader /> */}
      {isLoading ? (
        <Skeleton variant="rounded" width={"100%"} height={118} />
      ) : (
        <>
          {questions &&
            questions.map((question) => (
              <Question key={question.id} question={question} />
            ))}
          {/* <Pagination
            count={3}
            page={page}
            onChange={(e, value) => {
              setPage(value);
            }}
            color="primary"
            shape="rounded"
          /> */}
        </>
      )}
    </Box>
  );
};

export default QuestionsPage;
