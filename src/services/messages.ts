import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';

import { db } from '../firebase-config';
import { ReceviveMessage } from '../pages/Chat/ChatDetails';

export const getAllMessages = async ({ chatId, otherUser }: any) => {
  const chatRef = doc(db, 'chat', chatId);

  const q = query(
    collection(db, 'messages'),
    where('chat', '==', chatRef),
    orderBy('creationTime')
  );

  const messages = await getDocs(q);

  const formatedMessages = messages.docs.map((messageDoc) => {
    return {
      ...messageDoc.data(),
      id: messageDoc.id,
      senderData: otherUser,
    } as ReceviveMessage;
  });

  return formatedMessages;
};

type SaveMessageParams = {
  body: string;
  chatId: string;
  userId: string;
};

export const saveMessage = async ({
  body,
  chatId,
  userId,
}: SaveMessageParams) => {
  const chatRef = doc(db, 'chat', chatId!);
  const userRef = doc(db, 'users', userId);

  const message = {
    body,
    creationTime: Timestamp.now(),
    sender: userRef,
    chat: chatRef,
  };

  await addDoc(collection(db, 'messages'), message);
};
