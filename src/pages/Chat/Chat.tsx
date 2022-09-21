import { Container, Stack } from '@mui/material';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../data/types';
import { db } from '../../firebase-config';
import { getUserByRef } from '../../services/users';
import { ChatDetails, ChatList } from '.';

type ReceviedChat = {
  id: string;
  users: DocumentReference<DocumentData>[];
};

export type FormatedChat = ReceviedChat & {
  otherUser: User;
};

const Chat = () => {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState<FormatedChat[]>([]);
  const [isLoading, setLoading] = useState(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const formatAndSaveChats = async (chatResult: ReceviedChat[]) => {
      if (currentUser) {
        const formatedChat: FormatedChat[] = [];
        for (let i = 0; i < chatResult.length; i++) {
          const otherUser = chatResult[i].users.find(
            (chatUser) => chatUser.id !== currentUser.uid
          );
          if (otherUser) {
            const otherUserData = await getUserByRef(otherUser);
            formatedChat.push({
              ...chatResult[i],
              otherUser: otherUserData,
            });
          }
        }

        setChats(formatedChat);
        setLoading(false);
      }
    };

    if (currentUser) {
      const user = doc(db, 'users', currentUser.uid);

      const q = query(
        collection(db, 'chat'),
        where('users', 'array-contains', user)
      );

      const unsub = onSnapshot(q, (querySnapshot) => {
        const chatResult: ReceviedChat[] = [];

        querySnapshot.forEach((chatDoc) => {
          chatResult.push({
            id: chatDoc.id,
            ...chatDoc.data(),
          } as ReceviedChat);
        });

        if (chatResult.length) {
          formatAndSaveChats(chatResult);
        }
      });
      return unsub;
    }
  }, [currentUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container sx={{ pt: 10 }}>
      <Stack direction="row" gap={4}>
        <ChatList chats={chats} />
        <Routes>
          <Route path="/" element={<div>Please Select A chat</div>} />
          <Route path=":chatId" element={<ChatDetails chats={chats} />} />
        </Routes>
      </Stack>
    </Container>
  );
};

export default Chat;
