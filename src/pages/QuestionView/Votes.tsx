import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { DocumentData, DocumentReference } from 'firebase/firestore';

import { useAuth } from '../../contexts/AuthContext';

type VotesProps = {
  upVotes: number;
  downVotes: number;
  votes?: {
    author: DocumentReference<DocumentData>;
    value: string;
  }[];
};

const Votes = ({ upVotes, downVotes, votes }: VotesProps) => {
  const { currentUser } = useAuth();

  const isVoted = votes?.find((vote) => vote.author.id === currentUser?.uid);

  return (
    <Stack direction="row" gap={2} mt={2}>
      <Stack direction="row">
        {upVotes}{' '}
        <ArrowUpward color={isVoted?.value === 'up' ? 'primary' : 'inherit'} />
      </Stack>
      <Stack direction="row">
        {downVotes}{' '}
        <ArrowDownward
          color={isVoted?.value === 'down' ? 'primary' : 'inherit'}
        />
      </Stack>
    </Stack>
  );
};

export default Votes;
