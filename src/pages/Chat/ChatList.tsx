import { List } from '@mui/material';

import { ChatItem } from '.';
import { FormatedChat } from './Chat';

type ChatListProps = {
  chats: FormatedChat[];
};

const ChatList = ({ chats }: ChatListProps) => {
  return (
    <List
      sx={{
        bgcolor: 'white',
        borderRadius: '10px',
        height: '90%',
        pt: {
          xs: 2.5,
          md: 0.6,
        },
        minWidth: {
          md: '320px',
        },
        width: {
          xs: '100%',
          md: 'auto',
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
