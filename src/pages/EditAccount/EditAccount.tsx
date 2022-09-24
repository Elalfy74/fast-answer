/* eslint-disable react/no-unescaped-entities */
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import avatar from '../../assets/avatar.jpg';

const EditAccount = () => {
  return (
    /*
    This page contain three major element displayed as flex in a column direction
      1. Account Header
      2. two major boxes in row direction
      3. action buttons
    */
    <Container maxWidth="lg" sx={{ mt: 4, width: '100%' }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="500" sx={{ mb: 2 }}>
        Account
      </Typography>

      {/* flex Box contain two major boxes */}
      <Stack
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
        }}
      >
        {/* User Details Box */}
        <Box
          sx={{
            bgcolor: 'white',
            boxShadow: 2,
            borderRadius: 2,
            p: 2,
          }}
        >
          <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
            USER DETAILS
          </Typography>
          <Divider />
          {/* Box holding two boxes inside one box is also two boxes */}
          <Stack spacing={2}>
            {/* Major Box contain General and personal info */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                mt: 2,
              }}
            >
              {/* 1/2 General Info Stack */}
              <Stack>
                <Typography variant="h6" fontWeight="500" sx={{ pl: 2 }}>
                  General Information
                </Typography>
                <Stack p={2} spacing={2} justifyContent="space-between">
                  <Stack
                    sx={{
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      justifyContent: 'space-between',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '14px', sm: 'inherit' },
                        fontWeight: { xs: '500', sm: '400' },
                        ml: { xs: 1, sm: 0 },
                        width: '55%',
                      }}
                    >
                      First Name
                    </Typography>
                    <TextField fullWidth size="small" />
                  </Stack>
                  <Stack
                    sx={{
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      justifyContent: 'space-between',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '14px', sm: 'inherit' },
                        fontWeight: { xs: '500', sm: '400' },
                        ml: { xs: 1, sm: 0 },
                        width: '55%',
                      }}
                    >
                      Last Name
                    </Typography>
                    <TextField fullWidth size="small" />
                  </Stack>
                  <Stack
                    sx={{
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      justifyContent: 'space-between',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '14px', sm: 'inherit' },
                        fontWeight: { xs: '500', sm: '400' },
                        ml: { xs: 1, sm: 0 },
                        width: '55%',
                      }}
                    >
                      Email
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      defaultValue="mahmoudabdallah@gmail.com"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Stack>
                  <Stack
                    sx={{
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      justifyContent: 'space-between',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '14px', sm: 'inherit' },
                        fontWeight: { xs: '500', sm: '400' },
                        ml: { xs: 1, sm: 0 },
                        width: '55%',
                      }}
                    >
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="password"
                      defaultValue="sadflaskjf"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>

              {/* 2/2 personal Stack */}
              <Stack>
                <Typography variant="h6" fontWeight="500" sx={{ pl: 2 }}>
                  Personal Info
                </Typography>
                <Stack p={2} spacing={2} justifyContent="space-between">
                  <Stack
                    sx={{
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      justifyContent: 'space-between',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '14px', sm: 'inherit' },
                        fontWeight: { xs: '500', sm: '400' },
                        ml: { xs: 1, sm: 0 },
                        width: '55%',
                      }}
                    >
                      Birth Date
                    </Typography>
                    <TextField fullWidth size="small" />
                  </Stack>
                  <Stack
                    sx={{
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      justifyContent: 'space-between',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '14px', sm: 'inherit' },
                        fontWeight: { xs: '500', sm: '400' },
                        ml: { xs: 1, sm: 0 },
                        width: '55%',
                      }}
                    >
                      Location
                    </Typography>
                    <TextField fullWidth size="small" />
                  </Stack>
                  <Stack
                    sx={{
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      justifyContent: 'space-between',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '14px', sm: 'inherit' },
                        fontWeight: { xs: '500', sm: '400' },
                        ml: { xs: 1, sm: 0 },
                        width: '55%',
                      }}
                    >
                      Phone Number
                    </Typography>
                    <TextField fullWidth size="small" />
                  </Stack>
                </Stack>
              </Stack>
            </Box>

            {/* Education Stack */}
            <Stack>
              <Typography variant="h6" fontWeight="500" sx={{ pl: 2 }}>
                Education Info
              </Typography>
              <Stack p={2} spacing={2} justifyContent="space-between">
                <Stack
                  sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    gap: 0.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '14px', sm: 'inherit' },
                      fontWeight: { xs: '500', sm: '400' },
                      ml: { xs: 1, sm: 0 },
                    }}
                  >
                    Major
                  </Typography>
                  <TextField fullWidth size="small" />
                </Stack>
                <Stack
                  sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    gap: 0.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '14px', sm: 'inherit' },
                      fontWeight: { xs: '500', sm: '400' },
                      ml: { xs: 1, sm: 0 },
                    }}
                  >
                    University Level
                  </Typography>
                  <TextField fullWidth size="small" />
                </Stack>
                <Stack
                  sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    gap: 0.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '14px', sm: 'inherit' },
                      fontWeight: { xs: '500', sm: '400' },
                      ml: { xs: 1, sm: 0 },
                    }}
                  >
                    College
                  </Typography>
                  <TextField fullWidth size="small" />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Avatar Box */}
        <Box
          sx={{
            bgcolor: 'white',
            boxShadow: 2,
            borderRadius: 2,
            p: 2,
            width: { sm: '100%', md: '28%' },
          }}
        >
          <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
            Avatar
          </Typography>
          <Divider />
          <Stack sx={{ m: 2 }}>
            <Stack alignItems="center">
              <Avatar
                alt="user avatar"
                src={avatar}
                sx={{ width: 200, height: 200 }}
              />
            </Stack>
            <Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ mt: 2 }}
              >
                <Typography fontWeight="500">@0xRamadan</Typography>
                <EditIcon fontSize="small" />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ mt: 2 }}
              >
                <Typography fontWeight="500">Bio</Typography>
                <EditIcon fontSize="small" />
              </Stack>
              <Divider />
              <Typography
                sx={{ mt: 2, alignSelf: 'center', fontStyle: 'italic' }}
              >
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
                corporis nostrum ad magni deleniti voluptatum voluptates in sit
                exercitationem rem sapiente aut neque nisi."
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      {/* action buttons */}
      <Stack direction="row" spacing={2} sx={{ p: 2, mt: 2 }}>
        <Button variant="contained" sx={{ p: '6px 60px 6px 60px' }}>
          Save
        </Button>
        <Button sx={{ p: '6px 50px 6px 50px' }}>Cancel</Button>
      </Stack>
    </Container>
  );
};

export default EditAccount;
