import { LoadingButton } from '@mui/lab';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { MDEditorField } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { AnswerType } from '../../data/global.types';
import { getAllAnswersOfQuestion, saveAnswer } from '../../services/answers';
import Answer from './Answer';

const AllAnswers = ({ qId }: { qId: string }) => {
  const { currentUser } = useAuth();
  const [value, setValue] = useState('');

  const { data: answers, isLoading } = useQuery(
    ['answers', qId],
    getAllAnswersOfQuestion
  );

  const queryClient = useQueryClient();

  const { mutate, isLoading: postLoading } = useMutation(saveAnswer, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['answers', qId],
        (oldData: AnswerType[] | undefined) => {
          return [data, ...(oldData ?? [])];
        }
      );
    },
  });

  const handleSubmit = async () => {
    if (!value) return;

    const newAnswer = {
      body: value as string,
      authorId: currentUser?.uid,
      questionId: qId as string,
    };

    mutate(newAnswer);
    setValue('');
  };

  if (isLoading) {
    return <CircularProgress sx={{ mt: 10 }} />;
  }
  return (
    <>
      <MDEditorField value={value} onChange={setValue} />
      <Stack
        direction="row"
        alignItems="center"
        alignSelf="flex-start"
        gap={2}
        mt={2}
      >
        {!currentUser && (
          <Stack direction="row" alignItems="center" gap={2}>
            <Button variant="contained" component={Link} to="/auth/login">
              Login
            </Button>
            <Typography component="span">OR</Typography>
          </Stack>
        )}
        <LoadingButton
          loading={postLoading}
          variant={currentUser ? 'contained' : 'text'}
          onClick={handleSubmit}
        >
          {currentUser ? 'Answer' : 'Answer Anonymously'}
        </LoadingButton>
      </Stack>
      <Typography
        component="h6"
        variant="body1"
        fontWeight="600"
        mt={4}
        alignSelf="flex-start"
      >
        {answers?.length} Answers
      </Typography>
      {answers?.map((answer: AnswerType) => (
        <Answer key={answer.id} answer={answer} />
      ))}
    </>
  );
};

export default AllAnswers;
