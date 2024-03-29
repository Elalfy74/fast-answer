import { Alert, CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { QuestionType } from '../../data/global.types';
import { getQuestionById } from '../../services/questions/questions';
import { AllAnswers, Question } from '.';

const QuestionDetails = () => {
  const { qId } = useParams();

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(
    ['question details', qId],
    getQuestionById,
    {
      initialData: () => {
        const questions = queryClient.getQueryData('questions') as {
          [key: string]: QuestionType[][];
        };
        if (questions) {
          let question;
          questions.pages.every((group) => {
            question = group.find((q) => q.id === qId);
            if (question) return false;
            return true;
          });
          if (question) {
            return question as QuestionType;
          }
        }
        return undefined;
      },
      staleTime: 30000,
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
