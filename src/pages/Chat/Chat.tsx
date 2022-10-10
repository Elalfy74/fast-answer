import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import PQueue from 'p-queue';
import { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase-config';
import { getUserByRef } from '../../services/users/users';
import { ChatDetails, ChatList } from '.';
import { FormatedChat, ReceviedChat } from './Chat.types';

const queue = new PQueue({ concurrency: 1 });

const Chat = () => {
  const [sm, setSm] = useState(true);

  const param = useParams();

  const { currentUser } = useAuth();
  const [chats, setChats] = useState<FormatedChat[]>([]);
  const [isLoading, setLoading] = useState(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const formatAndSaveChats = async (chatResult: ReceviedChat[]) => {
      if (currentUser) {
        const formatedChat: FormatedChat[] = [];

        await queue.addAll(
          chatResult.map((chat) => {
            return async () => {
              const otherUserRef = chat.users.find(
                (user) => user.id !== currentUser.uid
              );

              if (otherUserRef) {
                const otherUser = await getUserByRef(otherUserRef);
                formatedChat.push({ ...chat, otherUser });
              }
            };
          })
        );

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
        } else {
          setLoading(false);
        }
      });
      return unsub;
    }
  }, [currentUser]);

  useEffect(() => {
    if (window.innerWidth > 900) {
      setSm(false);
    }
  }, []);

  return (
    <>
      {isLoading && (
        <Box pt={4} textAlign="center">
          <CircularProgress />
        </Box>
      )}
      {!isLoading && chats.length === 0 && (
        <Box mt={10} textAlign="center">
          <Typography variant="h6">No Chats available</Typography>
        </Box>
      )}
      {!isLoading && chats.length !== 0 && (
        <Stack
          direction="row"
          gap={3}
          sx={{
            height: '100%',
          }}
        >
          {/* Show Chat List and Chat Details seperated (Routes) On small Screens */}
          {((sm && !param['*']) || !sm) && <ChatList chats={chats} />}
          {((sm && param['*']) || !sm) && (
            <Routes>
              <Route
                path="/"
                element={
                  <Box mx="auto" mt={20}>
                    Please Select A chat
                  </Box>
                }
              />
              <Route path=":chatId" element={<ChatDetails chats={chats} />} />
            </Routes>
          )}
        </Stack>
      )}
    </>
  );
};

export default Chat;
