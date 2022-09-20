import { Send as SendIcon } from '@mui/icons-material';
import { Box, IconButton, Stack, TextField } from '@mui/material';

import { Message } from '.';

const ChatDetails = () => {
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
        <Message mine={false} />
        <Message mine={false} />
        <Message mine />
        <Message mine={false} />
        <Message mine />
        <Message mine={false} />
        <Message mine={false} />
        <Message mine={false} />
        <Message mine />
        <Message mine />
      </Stack>
      <Box display="flex" alignItems="center" gap={1} pt={1}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          inputProps={{
            style: {
              padding: '0px 15px',
            },
          }}
          multiline
          sx={{
            [`& fieldset`]: {
              borderRadius: '9999px',
            },
          }}
        />
        <IconButton
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
