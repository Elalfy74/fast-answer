import { CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';

import { useAuth } from '../../contexts/AuthContext';
import { getUserById } from '../../services/users';
import AvatarBox from './AvatarBox';
import UserDetails from './UserDetails';

const EditAccount = () => {
  const { currentUser } = useAuth();

  const { data, isLoading } = useQuery(
    'Profile Data',
    () => getUserById(currentUser!.uid),
    {
      refetchOnWindowFocus: false,
    }
  );

  const initialValues = {
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    birthdate: data?.birthdate || '',
    country: data?.country || '',
    gender: data?.gender || '',
    university: data?.university || '',
    jobTitle: data?.jobTitle || '',
  };

  if (isLoading) {
    return (
      <Stack alignItems="center" pt={4}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    /*
    This page contain three major element displayed as flex in a column direction
      1. Account Header
      2. two major boxes in row direction
      3. action buttons
    */
    <>
      {/* Header */}
      <Typography variant="h4" fontWeight="500" sx={{ mb: 2 }}>
        Account
      </Typography>

      {/* flex Box contain two major boxes */}
      <Stack
        sx={{
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 2,
        }}
      >
        {/* User Details Box */}
        <UserDetails userId={currentUser!.uid} initialValues={initialValues} />

        {/* Avatar Box */}
        <AvatarBox
          initialValues={{
            avatar: data?.avatar || '',
            bio: data?.bio || '',
            userName: data?.userName || '',
          }}
        />
      </Stack>
    </>
  );
};

export default EditAccount;
