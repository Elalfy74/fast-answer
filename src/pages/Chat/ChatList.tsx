import { List } from '@mui/material';

import { ChatItem } from '.';
import { FormatedChat } from './Chat';

type ChatListProps = {
  chats: FormatedChat[];
};

const ChatList = ({ chats }: ChatListProps) => {
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
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </List>
  );
};

export default ChatList;
