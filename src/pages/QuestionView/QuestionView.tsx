import { CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { MDEditorField } from '../../components';
import { AnswerType, QuestionType } from '../../data/types';
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

  const [answers, setAnswers] = useState<AnswerType[]>([]);

  useEffect(() => {
    const getQuestion = async () => {
      await sendRequest('VUeKWcxtqsBWbngolNa5');

      const answersFromServer = await getAllAnswersOfQuestion(
        'VUeKWcxtqsBWbngolNa5'
      );

      setAnswers(answersFromServer);
    };
    getQuestion();
  }, [sendRequest]);
  return (
    <Stack alignItems="center">
      {loading === 'pending' && <CircularProgress sx={{ mt: 10 }} />}
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
            {answers.length} Answers
          </Typography>
          {answers.map((answer) => (
            <Answer key={answer.id} answer={answer} />
          ))}
        </>
      )}
      {loading === 'failed' && <p>{error.message}</p>}
    </Stack>
  );
};

export default QuestionView;
