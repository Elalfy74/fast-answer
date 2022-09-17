import { CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { QuestionType } from '../../data/types';
import useHttp from '../../hooks/use-http';
import { getQuestionById } from '../../services/questions';
import { AllAnswers, Question } from '.';

const QuestionView = () => {
  const { qId } = useParams();

  const {
    sendRequest,
    loading,
    data: question,
    error,
  } = useHttp(getQuestionById, true);

  useEffect(() => {
    sendRequest(qId);
  }, [sendRequest, qId]);

  return (
    <Stack alignItems="center">
      {loading === 'pending' && <CircularProgress sx={{ mt: 10 }} />}
      {loading === 'succeeded' && (
        <>
          <Question question={question as QuestionType} />
          <AllAnswers qId={qId as string} />
        </>
      )}
      {loading === 'failed' && <p>{error.message}</p>}
    </Stack>
  );
};

export default QuestionView;
