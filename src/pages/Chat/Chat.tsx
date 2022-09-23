import { Box, CircularProgress, Container, Grid, Stack } from '@mui/material';
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
import { MiniLeftSideBar } from '../../layouts';
import BottomNavigationBar from '../../layouts/BottomNavigationBar';
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
  const [mobile, setMobile] = useState(true);
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

        await Promise.all(
          chatResult.map(async (chat) => {
            const otherUserRef = chat.users.find(
              (user) => user.id !== currentUser.uid
            );

            if (otherUserRef) {
              const otherUser = await getUserByRef(otherUserRef);
              formatedChat.push({ ...chat, otherUser });
            }
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
        }
      });
      return unsub;
    }
  }, [currentUser]);

  useEffect(() => {
    if (window.innerWidth > 600) {
      setMobile(false);
    }
    if (window.innerWidth > 900) {
      setSm(false);
    }
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: {
          xs: 0,
          sm: '20px',
        },
        height: '100vh',
        px: {
          xs: 0,
          sm: 1,
          md: 2,
        },
      }}
    >
      <Grid
        container
        columnSpacing={{ xs: 3, lg: 4 }}
        sx={{
          height: '100%',
          width: '100%',
        }}
      >
        {!mobile && (
          <Grid
            item
            sm={1.5}
            sx={{
              position: 'sticky',
              top: 20,
            }}
          >
            <MiniLeftSideBar />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sm={10.5}
          sx={{
            height: '100%',
          }}
        >
          {isLoading && (
            <Box pt={4} textAlign="center">
              <CircularProgress />
            </Box>
          )}
          {!isLoading && (
            <Stack
              direction="row"
              gap={3}
              sx={{
                height: '100%',
              }}
            >
              {((sm && !param['*']) || !sm) && (
                <>
                  <ChatList chats={chats} />
                  {mobile && <BottomNavigationBar />}
                </>
              )}
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
                  <Route
                    path=":chatId"
                    element={<ChatDetails chats={chats} />}
                  />
                </Routes>
              )}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
