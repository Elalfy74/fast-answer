import { Bookmark, BookmarkAddOutlined } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';

import { useAuth } from '../../contexts/AuthContext';
import { QuestionType } from '../../data/global.types';
import { handleBookMark } from '../../services/questions/questions';
import { BookMarkAction } from '../../services/questions/questions.types';
import { QA, Votes } from '.';

type QuestionProps = {
  question: QuestionType;
};

const Question = ({ question }: QuestionProps) => {
  const { currentUser } = useAuth();

  const { mutate } = useMutation(handleBookMark);
  const queryClient = useQueryClient();

  const isFavorite = question.bookMarkers?.includes(currentUser!.uid);

  const handleSaveBookMark = () => {
    mutate(
      {
        userId: currentUser!.uid,
        questionId: question.id,
        action: isFavorite ? BookMarkAction.REMOVE : BookMarkAction.ADD,
      },
      {
        onSuccess: () => {
          queryClient.setQueryData<QuestionType | undefined>(
            ['question details', question.id],
            (oldData) =>
              oldData && {
                ...oldData,
                bookMarkers: [currentUser!.uid, ...(oldData.bookMarkers || [])],
              }
          );
        },
      }
    );
  };

  return (
    <Box width="100%">
      <Typography component="h1" variant="h5" fontWeight="600" mb={2}>
        {question.title}
      </Typography>
      <QA
        authorUserName={question.author?.userName}
        authorAvatar={question.author?.avatar}
        creationTime={question.creationTime}
        body={question.body}
      />
      {/* UpVotes and Save Question */}
      <Stack direction="row" justifyContent="space-between">
        <Votes type="question" votes={question.votes} id={question.id} />
        {currentUser && (
          <IconButton onClick={handleSaveBookMark} disableRipple>
            {isFavorite && <Bookmark color="primary" />}
            {!isFavorite && <BookmarkAddOutlined color="info" />}
          </IconButton>
        )}
      </Stack>
    </Box>
  );
};

export default Question;
