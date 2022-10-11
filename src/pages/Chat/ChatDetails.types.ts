import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore';

import { User } from '../../data/global.types';
import { FormatedChat } from './Chat.types';

export type ReceviveMessage = {
  id: string;
  body: string;
  creationTime: Timestamp;
  sender: DocumentReference<DocumentData>;
  chat: DocumentReference<DocumentData>;
  senderData: User;
};

export type ChatDetailsProps = {
  chats: FormatedChat[];
};
