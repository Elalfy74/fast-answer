import { CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';

import { useAuth } from '../../contexts/AuthContext';
import { getBookMarks } from '../../services/questions/questions';
import { Question } from '../AllQuestions';

const BookMarks = () => {
  const { currentUser } = useAuth();
  const { data: questions, isLoading } = useQuery('bookMarks', () =>
    getBookMarks(currentUser!.uid)
  );

  if (isLoading) {
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 10 }} />
      </Stack>
    );
  }

  return (
    <Stack direction="column" spacing={4}>
      <Typography variant="h5">BookMarks</Typography>
      {questions?.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </Stack>
  );
};

export default BookMarks;
