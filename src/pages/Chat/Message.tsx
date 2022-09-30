import { Avatar, Box, Typography } from '@mui/material';

import { useAuth } from '../../contexts/AuthContext';
import { ReceviveMessage } from './ChatDetails';

type MessageProps = {
  message: ReceviveMessage;
};

const Message = ({ message }: MessageProps) => {
  const { currentUser } = useAuth();

  let mine = false;

  if (currentUser) {
    if (currentUser.uid === message.sender.id) {
      mine = true;
    }
  }

  if (mine) {
    return (
      <Box
        bgcolor="primary.main"
        mb={2}
        sx={{
          width: 'fit-content',
          alignSelf: 'flex-end',
          p: 3,
          borderRadius: '20px',
          borderTopRightRadius: '0px',
          maxWidth: '80%',
        }}
      >
        <Typography
          variant="body2"
          color="white"
          sx={{
            wordBreak: 'break-all',
          }}
        >
          {message.body}
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" mb={2}>
      {/* <Stack alignItems="center"> */}
      <Avatar
        src={message.senderData.avatar}
        sx={{
          width: 50,
          height: 50,
        }}
      />
      {/* <Typography variant="body2" fontWeight="500">
          09:00
        </Typography> */}
      {/* </Stack> */}
      <Box
        ml={1}
        p={3}
        sx={{
          bgcolor: '#F2F5F9',
          borderRadius: '20px',
          borderTopLeftRadius: '0px',
        }}
      >
        <Typography variant="body2">{message.body}</Typography>
      </Box>
    </Box>
  );
};

export default Message;
