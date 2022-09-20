import { Container, Stack } from '@mui/material';
import React from 'react';

import { ChatDetails, ChatList } from '.';

const Chat = () => {
  return (
    <Container sx={{ pt: 10 }}>
      <Stack direction="row" gap={4}>
        <ChatList />
        <ChatDetails />
      </Stack>
    </Container>
  );
};

export default Chat;
