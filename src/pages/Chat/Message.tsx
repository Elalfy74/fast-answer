import { Avatar, Box, Stack, Typography } from '@mui/material';

import avatar from '../../assets/avatar.jpg';

const Message = ({ mine }: { mine: boolean }) => {
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
        }}
      >
        <Typography variant="body2" color="white">
          Lorem ipsum dolor sit amet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" mb={2}>
      <Stack alignItems="center">
        <Avatar
          src={avatar}
          sx={{
            width: 50,
            height: 50,
          }}
        />
        <Typography variant="body2" fontWeight="500">
          09:00
        </Typography>
      </Stack>
      <Box
        ml={1}
        p={3}
        sx={{
          bgcolor: '#F2F5F9',
          borderRadius: '20px',
          borderTopLeftRadius: '0px',
        }}
      >
        <Typography variant="body2">Lorem ipsum dolor sit amet.</Typography>
      </Box>
    </Box>
  );
};

export default Message;
