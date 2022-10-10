import { LocationOnOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { TagsList } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { openChat } from '../../services/chat';
import { getUserById } from '../../services/users';

type TabPanelProps = {
  children: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const UserProfile = () => {
  const [value, setValue] = useState(0);

  const { currentUser, logout } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();

  const uId =
    (currentUser && userId === currentUser.uid) || (currentUser && !userId)
      ? currentUser.uid
      : userId!;

  const { data, isLoading } = useQuery(['users', uId], () => getUserById(uId));

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const handleChat = async () => {
    if (!currentUser) return;
    const chatId = await openChat(currentUser.uid, userId!);
    navigate(`/chat/${chatId}`);
  };

  const handleLogOut = () => {
    logout();
  };

  if (currentUser && userId === currentUser.uid) {
    return <Navigate to="/profile" replace />;
  }

  if (isLoading) {
    return (
      <Stack alignItems="center" pt={4}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: 5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', lg: 'flex-start' },
        }}
      >
        <Avatar
          src={data?.avatar}
          alt="user-avatar"
          sx={{
            objectFit: 'contain',
            width: 200,
            height: 200,
          }}
        />
        <Stack mt={2}>
          <Stack direction="row" gap={2}>
            <Typography variant="h5" component="h1">
              {data?.firstName} {data?.lastName}
            </Typography>
            <Stack direction="row" alignItems="center" color="gray">
              <LocationOnOutlined />
              <Typography variant="body2" component="p">
                {data?.country}
              </Typography>
            </Stack>
          </Stack>
          {data?.jobTitle && (
            <Typography variant="body2" component="p" mt={1} color="primary">
              {data.jobTitle}
            </Typography>
          )}
          {/* Chat/follow buttons */}
          {userId && (
            <Stack
              direction="row"
              alignItems="center"
              mt={4}
              sx={{
                gap: {
                  xs: 4,
                  md: 6,
                },
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  width: '120px',
                }}
                onClick={handleChat}
              >
                Chat
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: '120px',
                }}
              >
                Follow
              </Button>
            </Stack>
          )}
          {!userId && (
            <Stack
              direction="row"
              alignItems="center"
              mt={4}
              sx={{
                gap: {
                  xs: 4,
                  md: 6,
                },
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Button
                variant="contained"
                component={Link}
                to="/profile-settings"
                sx={{ width: '120px' }}
              >
                Edit Profile
              </Button>
              <Button
                onClick={handleLogOut}
                variant="outlined"
                sx={{
                  width: '120px',
                }}
              >
                Logout
              </Button>
            </Stack>
          )}
          {/* Bio and tags */}
          <Stack sx={{ maxWidth: '300px' }}>
            <Divider
              textAlign="left"
              sx={{
                mt: 2,
                mb: 1,
                fontWeight: '500',
              }}
            >
              Bio
            </Divider>
            <Typography
              sx={{ textAlign: { xs: 'center', lg: 'start' } }}
              variant="body2"
            >
              {data?.bio}
            </Typography>
            <Divider
              textAlign="left"
              sx={{
                mt: 2,
                mb: 1,
                fontWeight: '500',
              }}
            >
              Interests
            </Divider>
            <TagsList
              tags={[
                {
                  id: '1',
                  name: 'React',
                },
                {
                  id: '2',
                  name: 'React',
                },
                {
                  id: '3',
                  name: 'React',
                },
              ]}
            />
          </Stack>
        </Stack>
      </Box>
      <Stack flex={2} sx={{ alignItems: { xs: 'center', lg: 'flex-start' } }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="About" />
            <Tab label="Questions" />
            <Tab label="Contribution" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Typography variant="overline" fontWeight="500">
            Contact Information
          </Typography>
          <List>
            <ListItem disableGutters>
              <Typography variant="body2" mr={2} fontWeight="500">
                Email:
              </Typography>
              <Typography variant="body2" color="primary">
                {data?.email}
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <Typography variant="body2" mr={2} fontWeight="500">
                Conutry:
              </Typography>
              <Typography variant="body2">{data?.country}</Typography>
            </ListItem>
          </List>
          <Typography variant="overline" fontWeight="500">
            Basic Information
          </Typography>
          <List>
            <ListItem disableGutters>
              <Typography variant="body2" mr={2} fontWeight="500">
                Birthdate:
              </Typography>
              <Typography variant="body2">{data?.birthdate}</Typography>
            </ListItem>
          </List>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Stack>
    </Container>
  );
};

export default UserProfile;
