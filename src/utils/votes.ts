import { Vote } from '../data/types';

export const getVotesNumber = (voteValue: string, arrayOfVotes: Vote[]) => {
  return arrayOfVotes.filter((vote) => vote.value === voteValue).length;
};
