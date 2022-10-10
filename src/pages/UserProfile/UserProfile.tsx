import { CircularProgress, Container, Stack } from '@mui/material';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { getUserById } from '../../services/users';
import { ProfileTabs, UserData } from '.';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const { userId } = useParams();

  const uId =
    (currentUser && userId === currentUser.uid) || (currentUser && !userId)
      ? currentUser.uid
      : userId!;

  const { data, isLoading } = useQuery(['users', uId], () => getUserById(uId));

  if (currentUser && userId === currentUser.uid) {
    return <Navigate to="/profile" replace />;
  }

  if (isLoading) {
    return (
      <Stack alignItems="center" pt={4} width="100%">
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
      <UserData data={data} userId={userId} />
      <ProfileTabs data={data} />
    </Container>
  );
};

export default UserProfile;
