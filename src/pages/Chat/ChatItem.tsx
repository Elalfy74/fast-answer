import {
  Avatar,
  Box,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { FormatedChat } from '../../contexts/ChatContext';

type ChatItemProps = {
  chat: FormatedChat;
};

const ChatItem = ({ chat }: ChatItemProps) => {
  return (
    <ListItem
      disablePadding
      sx={{
        mt: 1,
      }}
    >
      <ListItemButton sx={{ borderRadius: '8px', mx: 1 }}>
        <Link to={chat.id}>
          <Box display="flex" mb={1.1} alignItems="center" gap={2}>
            <Avatar
              src={chat.otherUser.PhotoUrl || undefined}
              sx={{
                width: 50,
                height: 50,
              }}
            />
            <Box
              sx={{
                display: 'flex',
                py: 1.1,
                borderBottom: '1px solid',
                borderBottomColor: 'divider',
              }}
            >
              <Box mr={2}>
                <Typography variant="h6">
                  {chat.otherUser.FirstName} {chat.otherUser.LastName || ''}
                </Typography>
                <Typography variant="caption" color="gray">
                  Lorem ipsum dolor sit amet.
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: '500',
                  alignSelf: 'flex-start',
                }}
              >
                09:00
              </Typography>
            </Box>
          </Box>
        </Link>
      </ListItemButton>
    </ListItem>
  );
};

export default ChatItem;
