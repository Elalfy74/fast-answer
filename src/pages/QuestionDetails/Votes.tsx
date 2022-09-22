import { PlayArrow, PlayArrowOutlined } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import { doc, DocumentData, DocumentReference } from 'firebase/firestore';
import { useState } from 'react';

import {
  DownVote,
  DownVoteOutlined,
  UpVote,
  UpVoteOutlined,
} from '../../components/svg';
import { useAuth } from '../../contexts/AuthContext';
import { Vote } from '../../data/types';
import { db } from '../../firebase-config';
import { updateVotes } from '../../services/votes';
import { getVotesNumber } from '../../utils/votes';

type VotesProps = {
  type: 'question' | 'answer';
  id: string;
  votes?: {
    author: DocumentReference<DocumentData>;
    value: string;
  }[];
};

const Votes = ({ type, id, votes }: VotesProps) => {
  const { currentUser } = useAuth();

  const [allVotes, setVotes] = useState(votes);
  const [loading, setLoading] = useState(false);

  const upVotes = getVotesNumber('up', allVotes);
  const downVotes = getVotesNumber('down', allVotes);

  const isVoted = allVotes?.find((vote) => vote.author.id === currentUser?.uid);

  const handleVote = async (voteValue: 'up' | 'down') => {
    if (!currentUser) return;

    // Create the new Vote Object
    const newVote = {
      author: isVoted?.author || doc(db, 'users', currentUser.uid),
      value: voteValue,
    };

    let newVotesArray: Vote[];
    // check if the user has already voted before
    if (allVotes) {
      // if there are old votes the user may be voted
      // if the user didn't vote before add the new vote to the old votes
      if (!isVoted) {
        newVotesArray = [...allVotes, newVote];
      } else {
        // if the user has already voted before get the old vote and change it with the new vote
        newVotesArray = allVotes.map((vote) =>
          vote.author.id === currentUser.uid ? newVote : vote
        );
      }
    } else {
      // if there are no old votes create a new array with the new vote
      newVotesArray = [newVote];
    }
    // update the votes in the database
    setLoading(true);
    await updateVotes({
      type,
      targetId: id,
      votes: newVotesArray,
    });

    // update the votes in the state
    setVotes(newVotesArray);
    setLoading(false);
  };

  return (
    <Stack direction="row" gap={2} mt={2}>
      <Stack direction="row" alignItems="center">
        <Typography component="span" width={15}>
          {upVotes}{' '}
        </Typography>
        {isVoted?.value === 'up' ? (
          <UpVote />
        ) : (
          <IconButton
            disabled={loading}
            onClick={() => handleVote('up')}
            disableRipple
            size="small"
          >
            <UpVoteOutlined />
          </IconButton>
        )}
      </Stack>
      <Stack direction="row" alignItems="center">
        <Typography component="span" width={15}>
          {downVotes}{' '}
        </Typography>
        {isVoted?.value === 'down' ? (
          <DownVote />
        ) : (
          <IconButton
            disabled={loading}
            onClick={() => handleVote('down')}
            disableRipple
            size="small"
          >
            <DownVoteOutlined />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
};

export default Votes;
