import { Send as SendIcon } from '@mui/icons-material';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../data/types';
import { db } from '../../firebase-config';
import { useReactQuerySubscription } from '../../hooks/useReactQuerySubscription';
import { getAllMessages } from '../../services/messages';
import { Message } from '.';
import { FormatedChat } from './Chat';

export type ReceviveMessage = {
  id: string;
  body: string;
  creationTime: Timestamp;
  sender: DocumentReference<DocumentData>;
  chat: DocumentReference<DocumentData>;
  senderData: User;
};

type ChatDetailsProps = {
  chats: FormatedChat[];
};

const ChatDetails = ({ chats }: ChatDetailsProps) => {
  const [messageValue, setMessage] = useState('');

  const { currentUser } = useAuth();
  const { chatId } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherUser = chats.find((chat) => chat.id === chatId)?.otherUser;

  const { data } = useQuery(
    ['messages', chatId],
    () =>
      getAllMessages({
        chatId: chatId!,
        otherUser,
      }),
    {
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView();
    };
    scrollToBottom();
  }, [data]);

  useReactQuerySubscription({
    otherUser: otherUser!,
    chatId: chatId!,
  });

  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chatRef = doc(db, 'chat', chatId!);
    const userRef = doc(db, 'users', currentUser!.uid);

    const message = {
      body: messageValue,
      creationTime: Timestamp.now(),
      sender: userRef,
      chat: chatRef,
    };

    setMessage('');
    await addDoc(collection(db, 'messages'), message);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      sendMessageHandler(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flex: 1,
        bgcolor: 'white',
        borderRadius: '10px',
        justifyContent: 'flex-end',
        py: 2,
        px: 2,
      }}
    >
      <Stack overflow="auto" px={2}>
        {data?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Stack>
      <Box
        component="form"
        display="flex"
        alignItems="center"
        gap={1}
        pt={1}
        onSubmit={sendMessageHandler}
      >
        <TextField
          fullWidth
          value={messageValue}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          placeholder="Type a message"
          multiline
          inputProps={{
            style: {
              padding: '0px 15px',
            },
          }}
          sx={{
            [`& fieldset`]: {
              borderRadius: '9999px',
            },
          }}
        />
        <IconButton
          type="submit"
          size="large"
          sx={{
            height: 'fit-content',
          }}
        >
          <SendIcon fontSize="medium" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatDetails;
