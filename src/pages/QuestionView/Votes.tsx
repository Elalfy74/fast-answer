import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Stack } from '@mui/material';

type VotesProps = {
  upVotes: number;
  downVotes: number;
};

const Votes = ({ upVotes, downVotes }: VotesProps) => {
  return (
    <Stack direction="row" gap={2}>
      <Stack direction="row">
        {upVotes} <ArrowUpward />
      </Stack>
      <Stack direction="row">
        {downVotes} <ArrowDownward />
      </Stack>
    </Stack>
  );
};

export default Votes;
