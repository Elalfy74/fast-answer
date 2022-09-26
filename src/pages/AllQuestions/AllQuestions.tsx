import { CircularProgress, Stack } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';

import { getAllQuestions } from '../../services/questions';
import { Question } from '.';

const AllQuestions = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery('questions', getAllQuestions, {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchOnMount: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0 || lastPage.length < 6) {
          return undefined;
        }
        return pages.length + 1;
      },
    });

  useEffect(() => {
    window.onscroll = () => {
      const scrollHeight =
        window.innerHeight + document.documentElement.scrollTop + 70;
      const offSet = document.documentElement.offsetHeight;

      if (
        scrollHeight >= offSet &&
        !isFetchingNextPage &&
        !isLoading &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [fetchNextPage, isFetchingNextPage, isLoading, hasNextPage]);

  if (isLoading) {
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 10 }} />
      </Stack>
    );
  }

  return (
    <Stack direction="column" alignItems="center" spacing={4}>
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </Fragment>
      ))}
      {isFetchingNextPage && <CircularProgress sx={{ mt: 10 }} />}
    </Stack>
  );
};

export default AllQuestions;
