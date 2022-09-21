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
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../data/types';
import { db } from '../../firebase-config';
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
  const [Messages, setMessages] = useState<ReceviveMessage[]>();
  const [messageValue, setMessage] = useState('');

  const { currentUser } = useAuth();
  const { chatId } = useParams();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (currentUser) {
      const { otherUser } = chats![0];
      const chatRef = doc(db, 'chat', chatId!);

      const q = query(
        collection(db, 'messages'),
        where('chat', '==', chatRef),
        orderBy('creationTime')
      );

      const unsub = onSnapshot(q, (querySnapshot) => {
        const receviveMesssages: ReceviveMessage[] = [];

        querySnapshot.forEach((messageDoc) => {
          receviveMesssages.push({
            id: messageDoc.id,
            ...messageDoc.data(),
            senderData: otherUser,
          } as ReceviveMessage);
        });

        setMessages(receviveMesssages);
      });
      return unsub;
    }
  }, [chats, currentUser, chatId]);

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
        height: '800px',
        flex: 1,
        bgcolor: 'white',
        borderRadius: '10px',
        justifyContent: 'flex-end',
        py: 2,
        px: 2,
      }}
    >
      <Stack overflow="auto" px={2}>
        {Messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
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
