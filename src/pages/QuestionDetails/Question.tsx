import { BookmarkAddOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { QuestionType } from '../../data/global.types';
import { QA, Votes } from '.';

type QuestionProps = {
  question: QuestionType;
};

const Question = ({ question }: QuestionProps) => {
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
        <BookmarkAddOutlined color="info" />
      </Stack>
    </Box>
  );
};

export default Question;
