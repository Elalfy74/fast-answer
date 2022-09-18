import { LoadingButton } from '@mui/lab';
import { CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { MDEditorField } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { AnswerType } from '../../data/types';
import useHttp from '../../hooks/use-http';
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
    onSuccess: () => {
      queryClient.invalidateQueries(['answers', qId]);
    },
  });

  // const [answers, setAnswers] = useState<AnswerType[]>([]);
  // const [loading, setLoading] = useState(true);

  // const {
  //   sendRequest: postAnswer,
  //   loading: postLoading,
  //   data: savedAnswer,
  //   error: postErrpr,
  // } = useHttp(saveAnswer, false);

  // On Mount
  // useEffect(() => {
  //   const getAnswers = async () => {
  //     setLoading(true);
  //     const response = await getAllAnswersOfQuestion();
  //     setAnswers(response);
  //     setLoading(false);
  //   };

  //   getAnswers();
  // }, [qId]);

  // On Save Question
  // useEffect(() => {
  //   if (savedAnswer) {
  //     setAnswers((prevAnswers) => [savedAnswer, ...prevAnswers]);
  //   }
  // }, [savedAnswer]);

  const handleSubmit = async () => {
    if (!value || !currentUser) return;

    const newAnswer = {
      body: value as string,
      authorId: currentUser.uid,
      questionId: qId as string,
    };

    mutate(newAnswer);
    // await postAnswer(newAnswer);

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
