import { LoadingButton } from '@mui/lab';
import { CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { MDEditorField } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { AnswerType } from '../../data/types';
import { getAllAnswersOfQuestion, saveAnswer } from '../../services/answers';
import Answer from './Answer';

const AllAnswers = ({ qId }: { qId: string }) => {
  const { currentUser } = useAuth();
  const [value, setValue] = useState<unknown>('');

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
    if (!value || !currentUser) return;

    const newAnswer = {
      body: value as string,
      authorId: currentUser.uid,
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
      <LoadingButton
        loading={postLoading}
        variant="contained"
        sx={{
          mt: 2,
          alignSelf: 'flex-start',
        }}
        onClick={handleSubmit}
      >
        Submit
      </LoadingButton>
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
