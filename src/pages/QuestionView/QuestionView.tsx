import { CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { MDEditorField } from '../../components';
import { QuestionType } from '../../data/types';
import useHttp from '../../hooks/use-http';
import { getAllAnswersOfQuestion } from '../../services/answers';
import { getQuestionById } from '../../services/questions';
import { Answer, Question } from '.';

const QuestionView = () => {
  const {
    sendRequest,
    loading,
    data: question,
    error,
  } = useHttp(getQuestionById, true);

  const [answers, setAnswers] = useState<any>([]);
  useEffect(() => {
    const getQuestion = async () => {
      await sendRequest('0RdxjPUIRAjdudYxJ8jl');

      const answersFromServer = await getAllAnswersOfQuestion(
        'ZadXxHyEVloZ0CWtkytC'
      );
      console.log(answersFromServer);
      setAnswers(answersFromServer);
    };
    getQuestion();
  }, [sendRequest]);
  return (
    <Stack alignItems="center">
      {loading === 'pending' && <CircularProgress />}
      {loading === 'succeeded' && (
        <>
          <Question question={question as QuestionType} />
          <MDEditorField />
          <Typography
            component="h6"
            variant="body1"
            fontWeight="600"
            mt={4}
            alignSelf="flex-start"
          >
            12 Answers
          </Typography>
          <Answer />
          <Answer />
          <Answer />
          <Answer />
          <Answer />
          <Answer />
          <Answer />
        </>
      )}
      {loading === 'failed' && <p>{error.message}</p>}
    </Stack>
  );
};

export default QuestionView;
