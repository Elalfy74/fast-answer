import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import { FormatedChat } from './Chat.types';

export type ChatItemProps = {
  chat: FormatedChat;
};

const ChatItem = ({ chat }: ChatItemProps) => {
  return (
    <>
      <ListItem
        disablePadding
        sx={{
          mt: 0.4,
          width: '100%',
          display: 'flex',
          justifyContent: {
            xs: 'flex-start',
            md: 'center',
          },
        }}
      >
        <NavLink
          to={chat.id}
          style={(navData) =>
            navData.isActive
              ? {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  borderRadius: '10px',
                  width: '90%',
                  margin: '0 auto',
                }
              : {
                  borderRadius: '10px',
                  width: '90%',
                  margin: '0 auto',
                }
          }
        >
          <ListItemButton
            sx={{
              borderRadius: '10px',
              px: {
                md: 2,
                lg: 4,
              },
              width: '100%',
            }}
          >
            <Box display="flex" mb={1.1} alignItems="center" gap={2}>
              <Avatar
                src={chat.otherUser.avatar}
                sx={{
                  width: 50,
                  height: 50,
                }}
              />
              <Typography variant="h6">{chat.otherUser.userName}</Typography>
            </Box>
          </ListItemButton>
        </NavLink>
      </ListItem>
      <Divider
        sx={{
          width: '90%',
          m: '10px auto',
          display: {
            md: 'none',
          },
        }}
      />
    </>
  );
};

export default ChatItem;
