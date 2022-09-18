import { Alert, CircularProgress, Stack } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { getQuestionById } from '../../services/questions';
import { AllAnswers, Question } from '.';

const QuestionDetails = () => {
  const { qId } = useParams();

  const { data, isLoading, error } = useQuery(
    ['question details', qId],
    getQuestionById,
    {
      staleTime: 30000,
    }
  );

  if (isLoading) {
    return (
      <Stack alignItems="center" mt={2}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error && error instanceof Error) {
    return <Alert>{error.message}</Alert>;
  }

  if (error && typeof error === 'string') {
    return <Alert>{error}</Alert>;
  }

  return (
    <Stack alignItems="center">
      <Question question={data!} />
      <AllAnswers qId={qId!} />
    </Stack>
  );
};

export default QuestionDetails;
