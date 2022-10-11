import { Box, Divider } from '@mui/material';

import { AnswerType } from '../../data/global.types';
import { QA, Votes } from '.';

type AnswerProps = {
  answer: AnswerType;
};

const Answer = ({ answer }: AnswerProps) => {
  return (
    <Box width="100%" py={3}>
      <Divider
        light
        sx={{
          mb: 4,
        }}
      />
      <QA
        authorUserName={answer.author?.userName}
        authorAvatar={answer.author?.avatar}
        body={answer.body}
        creationTime={answer.creationTime}
      />
      <Votes type="answer" votes={answer.votes} id={answer.id} />
    </Box>
  );
};

export default Answer;
