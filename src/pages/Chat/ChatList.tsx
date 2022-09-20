import { List, Stack } from '@mui/material';

import { ChatItem } from '.';

const ChatList = () => {
  return (
    <List
      component="ul"
      sx={{
        bgcolor: 'white',
        borderRadius: '10px',
        pt: 0,
        display: {
          xs: 'none',
          md: 'block',
        },
      }}
    >
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      {/* <ChatItem /> */}
    </List>
  );
};

export default ChatList;
