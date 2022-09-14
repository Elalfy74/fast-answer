import { CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';

import { Question } from '../components';
import { QuestionType } from '../components/Question.types';
import { Loading } from '../data/types';
import useHttp from '../hooks/use-http';
import { getQuestionById } from '../services/questions';

function QuestionView() {
  const {
    sendRequest,
    loading,
    data: question,
    error,
  } = useHttp(getQuestionById, true);

  useEffect(() => {
    const getQuestion = async () => {
      await sendRequest('');
    };
    getQuestion();
  }, [sendRequest]);
  return (
    <Stack alignItems="center">
      {loading === 'pending' && <CircularProgress />}
      {loading === 'succeeded' && (
        // eslint-disable-next-line prettier/prettier
        <Question question={question as QuestionType} />
      )}
      {loading === 'failed' && <p>{error}</p>}
    </Stack>
  );
}

export default QuestionView;
