import { Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { openChat } from '../../services/chat';

type UserProfileActionsProps = {
  userId: string | undefined;
};

const UserProfileActions = ({ userId }: UserProfileActionsProps) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleChat = async () => {
    if (!currentUser) return;
    const chatId = await openChat(currentUser.uid, userId!);
    navigate(`/chat/${chatId}`);
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      {currentUser && userId && (
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
      {currentUser && !userId && (
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
    </>
  );
};

export default UserProfileActions;
