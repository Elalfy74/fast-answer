// Start Custom Components
import { useEffect, useState } from "react";
import { questions } from "../data/questions";
// End Custom Components
import { Box, Container, Pagination, CircularProgress } from "@mui/material";
import { Question, QuestionHeader } from "../components";
// import { asyncGetAllQuestions } from "../../redux/actions/questions_actions";
// import { asyncGetAllTags } from "../../redux/actions/tags_actions";
const QuestionsPage: React.FC = () => {
  // const token = useSelector((state) => state.auth.token);
  // const questions = useSelector((state) => state.questions.questions);

  // const isLoading = useSelector((state) => state.questions.isLoading);
  // const error = useSelector((state) => state.questions.error);
  let isLoading = false;
  const [page, setPage] = useState(1);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(asyncGetAllQuestions(token, page));
  //   dispatch(asyncGetAllTags);
  // }, [dispatch, token, page]);

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
        <CircularProgress color="primary" />
      ) : (
        <>
          {questions &&
            questions.map((question) => (
              <Question key={question.question_id} question={question} />
            ))}
          <Pagination
            count={3}
            page={page}
            onChange={(e, value) => {
              setPage(value);
            }}
            color="primary"
            shape="rounded"
          />
        </>
      )}
    </Box>
  );
};

export default QuestionsPage;
