import {
  ArrowDownward,
  ArrowUpward,
  BookmarkAddOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Stack, Typography } from '@mui/material';

import { QuestionType } from '../../data/types';
import { QA, Votes } from '.';

type QuestionProps = {
  question: QuestionType;
};

const Question = ({ question }: QuestionProps) => {
  const { PhotoUrl, FirstName, LastName } = question.authorId;
  return (
    <Box>
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
        <Votes upVotes={13} downVotes={10} />
        <BookmarkAddOutlined color="info" />
      </Stack>
    </Box>
  );
};

export default Question;
