import { CircularProgress, Stack } from '@mui/material';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

import useHttPersistent from '../../hooks/use-http-persistent';
import { getAllQuestions } from '../../services/questions';
import { Question } from '.';

const AllQuestions = () => {
  const [paginationTrigger, setPaginationTrigger] = useState(false);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  const { sendRequest, data, error, loading } = useHttPersistent(
    getAllQuestions,
    true
  );
  console.log(data?.hasMore);

  const getNextQuestions = useCallback(
    async (last: {
      doc?: QueryDocumentSnapshot<DocumentData> | null;
      setLast: React.Dispatch<
        React.SetStateAction<QueryDocumentSnapshot<DocumentData> | null>
      >;
    }) => {
      await sendRequest(last);
    },
    [sendRequest]
  );

  useEffect(() => {
    getNextQuestions({ setLast: setLastDoc });
  }, [getNextQuestions]);

  window.onscroll = () => {
    const scrollHeight =
      window.innerHeight + document.documentElement.scrollTop + 70;
    const offSet = document.documentElement.offsetHeight;

    if (scrollHeight >= offSet && data?.hasMore && loading !== 'pending') {
      // setPaginationTrigger((prevState) => !prevState);
      getNextQuestions({ doc: lastDoc, setLast: setLastDoc });
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

      {loading === 'pending' && <CircularProgress sx={{ mt: 10 }} />}

      {error && <p>{error}</p>}
    </Stack>
  );
};

export default AllQuestions;
