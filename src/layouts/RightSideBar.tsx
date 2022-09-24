import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import avatar from '../assets/avatar.jpg';
import { getFeaturedQuestions } from '../services/questions';
import { getTopUsers } from '../services/users';

const RightSideBar = () => {
  const { data, isLoading } = useQuery(
    'Featured Questions',
    getFeaturedQuestions,
    {
      refetchOnWindowFocus: false,
      staleTime: 3000,
    }
  );

  const { data: topUsers, isLoading: usersLoading } = useQuery(
    'Top Users',
    getTopUsers,
    {
      refetchOnWindowFocus: false,
      staleTime: 3000,
    }
  );
  return (
    <Stack
      spacing={2}
      sx={{
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
          <Typography
            sx={{
              fontWeight: '500',
              fontSize: {
                md: '13px',
                lg: '16px',
              },
            }}
          >
            LeaderBoard
          </Typography>
        </Stack>
        <Divider />

        {/* Leader Board Memebers */}
        <Stack
          spacing={2}
          sx={{
            mt: 1.5,
            px: {
              md: 1,
              lg: 3,
            },
          }}
        >
          {usersLoading && (
            <CircularProgress
              size={20}
              sx={{
                mx: 'auto',
              }}
            />
          )}
          {topUsers?.map((user) => (
            <Stack direction="row" gap={1} alignItems="center" key={user.id}>
              <Avatar
                alt="user avatar"
                src={user.PhotoUrl || undefined}
                sx={{
                  width: {
                    md: 30,
                    lg: 35,
                  },
                  height: {
                    md: 30,
                    lg: 35,
                  },
                }}
              />
              <Stack>
                <Typography
                  sx={{
                    fontSize: {
                      md: '12px',
                      lg: '14px',
                    },
                    fontWeight: '500',
                  }}
                >
                  {user.FirstName} {user.LastName || ''}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      md: '10px',
                      lg: '12px',
                    },
                  }}
                >
                  {user.answersCount} Contrubutions
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* Trending Questions */}

      <Box borderRadius="8px" bgcolor="white" height="320px" pt="8px">
        {/* Header */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 0.5 }}
        >
          <TrendingUpIcon fontSize="small" color="success" />
          <Typography
            sx={{
              fontWeight: '500',
              fontSize: {
                md: '13px',
                lg: '16px',
              },
            }}
          >
            Trending Questions
          </Typography>
        </Stack>
        <Divider />
        {/* Questions */}
        <Stack spacing={2} sx={{ mt: 1.5, px: 2 }}>
          {isLoading && (
            <CircularProgress
              size={20}
              sx={{
                alignSelf: 'center',
              }}
            />
          )}
          {data?.map((question) => (
            <Stack gap={0.5} key={question.id}>
              <Link to={`/questions/${question.id}`}>
                <Typography
                  noWrap
                  color="secondary.main"
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s ',
                    '&:hover': {
                      color: 'secondary.100',
                    },
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {question.title}
                </Typography>
              </Link>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  flexWrap: 'wrap',
                }}
              >
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  Asked by
                </Typography>
                <Typography sx={{ fontWeight: '600', fontSize: '12px' }}>
                  {question.author.FirstName} {question.author.LastName || ''}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default RightSideBar;
