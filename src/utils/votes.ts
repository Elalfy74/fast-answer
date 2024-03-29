import { Vote } from '../data/global.types';

export const getVotesNumber = (
  voteValue: string,
  arrayOfVotes: Vote[] | undefined
) => {
  if (!arrayOfVotes) return 0;
  return arrayOfVotes.filter((vote) => vote.value === voteValue).length;
};
