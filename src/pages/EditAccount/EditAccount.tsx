import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';

const EditAccount = () => {
  return (
    <Stack>
      <Typography>Accout</Typography>
      <Stack direction="row" spacing={2}>
        {/* User Details Box */}
        <Box>
          <Typography>User Details</Typography>
          <Divider />
          {/* Box holding three Categories */}
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <Box>
              <Typography>General Information</Typography>
              <Stack>
                <Stack direction="row">
                  <Typography>First Name</Typography>
                  <TextField variant="outlined" />
                </Stack>
                <Stack direction="row">
                  <Typography>First Name</Typography>
                  <TextField variant="outlined" />
                </Stack>
                <Stack direction="row">
                  <Typography>First Name</Typography>
                  <TextField variant="outlined" />
                </Stack>
                <Stack direction="row">
                  <Typography>First Name</Typography>
                  <TextField variant="outlined" />
                </Stack>
              </Stack>
            </Box>
            <Box>
              <Typography>Location</Typography>
              <Stack>
                <Stack direction="row">
                  <Typography>District</Typography>
                  <TextField variant="outlined" />
                </Stack>
                <Stack direction="row">
                  <Typography>First Name</Typography>
                  <TextField variant="outlined" />
                </Stack>
                <Stack direction="row">
                  <Typography>First Name</Typography>
                  <TextField variant="outlined" />
                </Stack>
                <Stack direction="row">
                  <Typography>First Name</Typography>
                  <TextField variant="outlined" />
                </Stack>
              </Stack>
            </Box>
            <Box>
              <Typography>Education Info</Typography>
              <Stack>
                <Stack direction="row">
                  <Typography>Degree</Typography>
                  <TextField variant="outlined" />
                </Stack>
                <Stack direction="row">
                  <Typography>Graduated in</Typography>
                  <TextField variant="outlined" />
                </Stack>
                <Stack direction="row">
                  <Typography>First Name</Typography>
                  <TextField variant="outlined" />
                </Stack>
                <Stack direction="row">
                  <Typography>First Name</Typography>
                  <TextField variant="outlined" />
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
        {/* Avatar Box */}
        <Box>
          <Typography>Avatar</Typography>
          <Divider />
          <Stack>
            <Avatar />
            <Stack>
              <Typography>bio</Typography>
              <Typography>life sucks</Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {/* action buttons */}
      <Stack direction="row">
        <Button>Save</Button>
        <Button>Cancel</Button>
      </Stack>
    </Stack>
  );
};

export default EditAccount;
