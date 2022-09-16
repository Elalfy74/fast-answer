import { Box, Stack, Typography, Avatar, Divider } from "@mui/material";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import avatar from '../assets/avatar.jpg'

const RightSideBar = () => {
  return (
    <Stack spacing={4}>

      {/* LeaderBoard */}
      <Box borderRadius="8px" bgcolor="white" height="400px" p="8px" >

        {/* Leader Board Header */}
        <Stack direction='row' spacing={1} justifyContent='center' sx={{ mb: 0.5 }}>
          <LeaderboardIcon fontSize="small" color="primary" />
          <Typography sx={{ fontWeight: "500", fontSize: '18px' }}>LeaderBoard</Typography>
        </Stack>
        <Divider />

        {/* Leader Board Memebers */}
        <Stack sx={{ mt: 1 }} spacing={2}>
          <Stack direction='row' gap={1} alignItems='center'>
            <Avatar alt="user avatar" src={avatar} sx={{ width: 35, height: 35 }} />
            <Stack>
              <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>Mahmoud Ramadan</Typography>
              <Typography color="text.secondary" sx={{ fontSize: '14px' }}>124 contributions</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' gap={1} alignItems='center'>
            <Avatar alt="user avatar" src={avatar} sx={{ width: 35, height: 35 }} />
            <Stack>
              <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>Mahmoud Ramadan</Typography>
              <Typography color="text.secondary" sx={{ fontSize: '14px' }}>124 contributions</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' gap={1} alignItems='center'>
            <Avatar alt="user avatar" src={avatar} sx={{ width: 35, height: 35 }} />
            <Stack>
              <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>Mahmoud Ramadan</Typography>
              <Typography color="text.secondary" sx={{ fontSize: '14px' }}>124 contributions</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' gap={1} alignItems='center'>
            <Avatar alt="user avatar" src={avatar} sx={{ width: 35, height: 35 }} />
            <Stack>
              <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>Mahmoud Ramadan</Typography>
              <Typography color="text.secondary" sx={{ fontSize: '14px' }}>124 contributions</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' gap={1} alignItems='center'>
            <Avatar alt="user avatar" src={avatar} sx={{ width: 35, height: 35 }} />
            <Stack>
              <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>Mahmoud Ramadan</Typography>
              <Typography color="text.secondary" sx={{ fontSize: '14px' }}>124 contributions</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' gap={1} alignItems='center'>
            <Avatar alt="user avatar" src={avatar} sx={{ width: 35, height: 35 }} />
            <Stack>
              <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>Mahmoud Ramadan</Typography>
              <Typography color="text.secondary" sx={{ fontSize: '14px' }}>124 contributions</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* Trending Questions */}
      <Box borderRadius="8px" bgcolor="white" height="400px" p="8px">
        {/* Header */}
        <Stack direction='row' spacing={1} justifyContent='center' sx={{ mb: 0.5 }}>
          <TrendingUpIcon fontSize="small" color="success" />
          <Typography sx={{ fontWeight: "500", fontSize: '18px' }}>Trending Questions</Typography>
        </Stack>
        <Divider />
        {/* Questions */}
        <Stack spacing={2}>
          <Box>
            <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>How to create horizontal carousel in JavaScript?</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Typography sx={{ color: 'text.secondary', fontSize: '14px', fontWeight: 'bold', }}>Asked by</Typography>
              <Typography sx={{ fontWeight: '500', fontSize: '14px' }}>Mahmoud Ramadan</Typography>
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>How to create horizontal carousel in JavaScript?</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Typography sx={{ color: 'text.secondary', fontSize: '14px', fontWeight: 'bold', }}>Asked by</Typography>
              <Typography sx={{ fontWeight: '500', fontSize: '14px' }}>Mahmoud Ramadan</Typography>
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>How to create horizontal carousel in JavaScript?</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Typography sx={{ color: 'text.secondary', fontSize: '14px', fontWeight: 'bold', }}>Asked by</Typography>
              <Typography sx={{ fontWeight: '500', fontSize: '14px' }}>Mahmoud Ramadan</Typography>
            </Box>
          </Box>

        </Stack>

      </Box>
    </Stack>
  );
};

export default RightSideBar;
