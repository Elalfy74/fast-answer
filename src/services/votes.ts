import { doc, updateDoc } from 'firebase/firestore';

import { Vote } from '../data/global.types';
import { db } from '../firebase-config';

type UpdateVotesParams = {
  type: 'question' | 'answer';
  targetId: string;
  votes: Vote[];
};

export const updateVotes = async ({
  type,
  targetId,
  votes,
}: UpdateVotesParams) => {
  if (type === 'answer') {
    const answerRef = doc(db, 'answers', targetId);

    await updateDoc(answerRef, {
      votes,
    });
  } else {
    const questionRef = doc(db, 'questions', targetId);

    await updateDoc(questionRef, {
      votes,
    });
  }
};
