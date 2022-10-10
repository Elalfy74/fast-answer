import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../firebase-config';

const chatCollectionRef = collection(db, 'chat');

// *********** APIS ***********

// GET chat
const getChat = async (
  firstUser: DocumentReference<DocumentData>,
  secondUser: DocumentReference<DocumentData>
) => {
  const chatQuery = query(
    chatCollectionRef,
    where('users', 'in', [
      [firstUser, secondUser],
      [secondUser, firstUser],
    ])
  );

  const chatDoc = await getDocs(chatQuery);

  if (chatDoc.empty) {
    return false;
  }

  return chatDoc.docs[0].id;
};

// POST Open Chat ROOM
export const openChat = async (senderId: string, receciverId: string) => {
  const senderIdRef = doc(db, 'users', senderId);
  const receciverRef = doc(db, 'users', receciverId);

  const result = await getChat(senderIdRef, receciverRef);

  if (result) return result;

  const newChat = {
    users: [senderIdRef, receciverRef],
  };
  const savedChat = await addDoc(chatCollectionRef, newChat);
  return savedChat.id;
};
