import { Box, Divider } from '@mui/material';

import { AnswerType } from '../../data/types';
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
        authorFirstName={answer.author.FirstName}
        authorLastName={answer.author.LastName}
        body={answer.body}
        creationTime={answer.creationTime}
      />
      <Votes votes={answer.votes} id={answer.id} />
    </Box>
  );
};

export default Answer;
