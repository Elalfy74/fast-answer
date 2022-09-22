import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';

import avatar from '../assets/avatar.jpg';

const RightSideBar = () => {
  return (
    <Stack
      spacing={4}
      sx={{
        width: '230px',
        position: 'sticky',
        top: 20,
      }}
    >
      {/* LeaderBoard */}
      <Box borderRadius="8px" bgcolor="white" height="320px" pt="8px">
        {/* Leader Board Header */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mb: 0.5 }}
        >
          <LeaderboardIcon fontSize="small" color="primary" />
          <Typography sx={{ fontWeight: '500', fontSize: '16px' }}>
            LeaderBoard
          </Typography>
        </Stack>
        <Divider />

        {/* Leader Board Memebers */}
        <Stack spacing={2} alignItems="center" sx={{ mt: 1.5 }}>
          <Stack direction="row" gap={1} alignItems="center">
            <Avatar
              alt="user avatar"
              src={avatar}
              sx={{ width: 35, height: 35 }}
            />
            <Stack>
              <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                Mahmoud Ramadan
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                124 contributions
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" gap={1} alignItems="center">
            <Avatar
              alt="user avatar"
              src={avatar}
              sx={{ width: 35, height: 35 }}
            />
            <Stack>
              <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                Mahmoud Ramadan
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                124 contributions
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" gap={1} alignItems="center">
            <Avatar
              alt="user avatar"
              src={avatar}
              sx={{ width: 35, height: 35 }}
            />
            <Stack>
              <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                Mahmoud Ramadan
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                124 contributions
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" gap={1} alignItems="center">
            <Avatar
              alt="user avatar"
              src={avatar}
              sx={{ width: 35, height: 35 }}
            />
            <Stack>
              <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                Mahmoud Ramadan
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                124 contributions
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" gap={1} alignItems="center">
            <Avatar
              alt="user avatar"
              src={avatar}
              sx={{ width: 35, height: 35 }}
            />
            <Stack>
              <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                Mahmoud Ramadan
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                124 contributions
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* Trending Questions */}

      <Box borderRadius="8px" bgcolor="white" height="320px" pt="8px">
        {/* Header */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mb: 0.5 }}
        >
          <TrendingUpIcon fontSize="small" color="success" />
          <Typography sx={{ fontWeight: '500', fontSize: '16px' }}>
            Trending Questions
          </Typography>
        </Stack>
        <Divider />
        {/* Questions */}
        {/* ! Can't center this stack, so I made a margin left */}
        <Stack spacing={2} sx={{ mt: 1.5, ml: 1.5 }}>
          <Stack gap={0.5}>
            <Box>
              <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
                How to create horizontal carousel in JavaScript?
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
              >
                Asked by
              </Typography>
              <Typography sx={{ fontWeight: '500', fontSize: '12px' }}>
                Mahmoud Ramadan
              </Typography>
            </Box>
          </Stack>
          <Stack gap={0.5}>
            <Box>
              <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
                How to create horizontal carousel in JavaScript?
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
              >
                Asked by
              </Typography>
              <Typography sx={{ fontWeight: '500', fontSize: '12px' }}>
                Mahmoud Ramadan
              </Typography>
            </Box>
          </Stack>
          <Stack gap={0.5}>
            <Box>
              <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
                How to create horizontal carousel in JavaScript?
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
              >
                Asked by
              </Typography>
              <Typography sx={{ fontWeight: '500', fontSize: '12px' }}>
                Mahmoud Ramadan
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default RightSideBar;
