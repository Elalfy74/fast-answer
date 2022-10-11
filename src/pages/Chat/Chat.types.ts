import { DocumentData, DocumentReference } from 'firebase/firestore';

import { User } from '../../data/global.types';

export type ReceviedChat = {
  id: string;
  users: DocumentReference<DocumentData>[];
};

export type FormatedChat = ReceviedChat & {
  otherUser: User;
};
