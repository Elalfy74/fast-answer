import { ArrowBack, Send as SendIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../data/types';
import { useReactQuerySubscription } from '../../hooks/useReactQuerySubscription';
import { getAllMessages, saveMessage } from '../../services/messages';
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
  const navigate = useNavigate();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherUser = useMemo(
    () => chats.find((chat) => chat.id === chatId)?.otherUser,
    [chatId, chats]
  );

  const { mutate } = useMutation(saveMessage);

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

    setMessage('');
    mutate({
      body: messageValue,
      chatId: chatId!,
      userId: currentUser!.uid,
    });
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
        flexGrow: 1,
        bgcolor: 'white',
        borderRadius: '10px',
        justifyContent: {
          ms: 'flex-end',
        },
        p: 2,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          display: {
            xs: 'flex',
            sm: 'none',
          },
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          py: 3,
          px: 2,
          gap: 2,
          bgcolor: 'white',
          zIndex: 99,
        }}
      >
        <IconButton onClick={() => navigate('/chat')}>
          <ArrowBack />
        </IconButton>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar src={otherUser?.PhotoUrl || undefined} />
          <Typography variant="body1">
            {otherUser?.FirstName} {otherUser?.LastName || ''}
          </Typography>
        </Box>
      </Paper>

      <Stack height="100%" justifyContent="flex-end">
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
      </Stack>
    </Box>
  );
};

export default ChatDetails;
