import { BookmarkAddOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { QuestionType } from '../../data/types';
import { QA, Votes } from '.';

type QuestionProps = {
  question: QuestionType;
};

const Question = ({ question }: QuestionProps) => {
  const { PhotoUrl, FirstName, LastName } = question.author;
  return (
    <Box width="100%">
      <Typography component="h1" variant="h5" fontWeight="600" mb={2}>
        {question.title}
      </Typography>
      <QA
        authorAvatar={PhotoUrl}
        authorFirstName={FirstName}
        authorLastName={LastName}
        creationTime={question.creationTime}
        body={question.body}
      />
      {/* UpVotes and Save Question */}
      <Stack direction="row" justifyContent="space-between">
        <Votes votes={question.votes} id={question.id} />
        <BookmarkAddOutlined color="info" />
      </Stack>
    </Box>
  );
};

export default Question;
