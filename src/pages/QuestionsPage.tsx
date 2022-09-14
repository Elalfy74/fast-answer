import { CircularProgress, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { Question, QuestionHeader } from '../components';
import useHttPersistent from '../hooks/use-http-persistent';
import { getAllQuestions } from '../services/questions';

const QuestionsPage = () => {
  const [paginationTrigger, setPaginationTrigger] = useState(false);

  const { sendRequest, data, error, loading } = useHttPersistent(
    getAllQuestions,
    true
  );

  const getNextQuestions = useCallback(async () => {
    await sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    getNextQuestions();
  }, [paginationTrigger, getNextQuestions]);

  window.onscroll = () => {
    const scrollHeight =
      window.innerHeight + document.documentElement.scrollTop + 70;
    const offSet = document.documentElement.offsetHeight;

    if (scrollHeight >= offSet && data?.hasMore && loading !== 'pending') {
      setPaginationTrigger((prevState) => !prevState);
    }
  };

  return (
    <Stack direction="column" alignItems="center" spacing={4}>
      {/* <QuestionHeader /> */}

      {data &&
        data.items.length > 0 &&
        data.items.map((question) => (
          <Question key={question.id} question={question} />
        ))}

      {loading === 'pending' && <CircularProgress />}

      {error && <p>{error}</p>}
    </Stack>
  );
};

export default QuestionsPage;
