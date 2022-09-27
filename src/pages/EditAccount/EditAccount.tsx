import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../data/types';
import { getUserById } from '../../services/users';
import AvatarBox from './AvatarBox';
import UserDetails from './UserDetails';

const EditAccount = () => {
  const { currentUser } = useAuth();
  const queryClinet = useQueryClient();

  const { data, isLoading } = useQuery(
    'Profile Data',
    () => getUserById(currentUser!.uid),
    {
      refetchOnWindowFocus: false,
    }
  );

  const initialValues = {
    firstName: data?.FirstName || '',
    lastName: data?.LastName || '',
    email: data?.Email || '',
    birthdate: data?.Birthdate || '',
    location: data?.location || '',
    phoneNumber: data?.PhoneNumber || '',
    major: data?.Major || '',
    college: data?.College || '',
    universityLevel: data?.UniversityLevel || '',
  };

  const handleChangeImg = useCallback(
    (value: string, newValue: string) => {
      queryClinet.setQueryData('Profile Data', (oldData: User | undefined) => {
        return { ...oldData, [value]: newValue } as User;
      });
    },
    [queryClinet]
  );

  if (isLoading) {
    return (
      <Box pt={4}>
        <CircularProgress
          sx={{
            mx: 'auto',
          }}
        />
      </Box>
    );
  }

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
        <UserDetails
          // onChangeHandler={handleChangeValue}
          initialValues={initialValues}
        />

        {/* Avatar Box */}
        <AvatarBox
          avatar={data?.PhotoUrl}
          bio={data?.Bio}
          onChangeHandler={handleChangeImg}
        />
      </Stack>
    </Container>
  );
};

export default EditAccount;
