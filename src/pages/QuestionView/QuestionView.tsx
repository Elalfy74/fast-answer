import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MDEditorField } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { AnswerType, QuestionType } from '../../data/types';
import useHttp from '../../hooks/use-http';
import { getAllAnswersOfQuestion, saveAnswer } from '../../services/answers';
import { getQuestionById } from '../../services/questions';
import { Answer, Question } from '.';

const QuestionView = () => {
  const [value, setValue] = useState<any>('');
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const { qId } = useParams();
  const { currentUser } = useAuth();

  const {
    sendRequest,
    loading,
    data: question,
    error,
  } = useHttp(getQuestionById, true);

  useEffect(() => {
    const getQuestion = async () => {
      await sendRequest(qId);

      const answersFromServer = await getAllAnswersOfQuestion(qId as string);

      setAnswers(answersFromServer);
    };
    getQuestion();
  }, [sendRequest, qId]);

  const handleSubmit = async () => {
    if (!value || !currentUser) return;

    await saveAnswer(currentUser.uid, qId as string, value);
  };
  return (
    <Stack alignItems="center">
      {loading === 'pending' && <CircularProgress sx={{ mt: 10 }} />}
      {loading === 'succeeded' && (
        <>
          <Question question={question as QuestionType} />
          <MDEditorField value={value} onChange={setValue} />
          <Button
            variant="contained"
            sx={{
              mt: 2,
              alignSelf: 'flex-start',
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
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
