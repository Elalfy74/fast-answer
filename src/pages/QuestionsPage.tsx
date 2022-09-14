import { CircularProgress, Stack } from '@mui/material';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

import { Question, QuestionHeader } from '../components';
import { QuestionType } from '../components/Question.types';
import { Loading } from '../data/types';
import { getAllQuestions } from '../services/questions';

function QuestionsPage() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState<Loading>('idle');
  const [paginationTrigger, setPaginationTrigger] = useState(false);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  const getNextQuestions = useCallback(async () => {
    const data = await getAllQuestions(lastDoc, setLastDoc, setLoading);

    setQuestions((oldQuestions) => [...oldQuestions, ...data]);
  }, []);

  useEffect(() => {
    getNextQuestions();
  }, [paginationTrigger, getNextQuestions]);

  window.onscroll = () => {
    const scrollHeight =
      window.innerHeight + document.documentElement.scrollTop + 70;
    const offSet = document.documentElement.offsetHeight;
    if (
      scrollHeight >= offSet &&
      loading !== 'finished' &&
      loading !== 'pending'
    ) {
      setPaginationTrigger((prevState) => !prevState);
    }
  };

  return (
    <Stack direction="column" alignItems="center" spacing={4}>
      {/* <QuestionHeader /> */}

      {questions.length > 0 &&
        questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}

      {loading === 'pending' && <CircularProgress />}
    </Stack>
  );
}

export default QuestionsPage;
