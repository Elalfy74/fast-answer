import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../data/types';
import { getUserById, updateUserData } from '../../services/users';
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

  const { mutate } = useMutation(updateUserData);

  const handleChangeImg = useCallback(
    (value: string, newValue: string) => {
      queryClinet.setQueryData('Profile Data', (oldData: User | undefined) => {
        return { ...oldData, [value]: newValue } as User;
      });
    },
    [queryClinet]
  );

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    queryClinet.setQueryData('Profile Data', (oldData: User | undefined) => {
      return { ...oldData, [value]: e.target.value } as User;
    });
  };

  const handleUpdate = () => {
    mutate(data!);
  };

  if (isLoading) {
    return (
      <Box pt={4} mx="auto">
        <CircularProgress />
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
        <UserDetails onChangeHandler={handleChangeValue} data={data!} />

        {/* Avatar Box */}
        <AvatarBox
          avatar={data?.PhotoUrl}
          bio={data?.Bio}
          onChangeHandler={handleChangeImg}
        />
      </Stack>

      {/* action buttons */}
      <Stack direction="row" spacing={2} sx={{ p: 2, mt: 2 }}>
        <Button
          variant="contained"
          sx={{ p: '6px 60px 6px 60px' }}
          onClick={handleUpdate}
        >
          Save
        </Button>
        <Button sx={{ p: '6px 50px 6px 50px' }}>Cancel</Button>
      </Stack>
    </Container>
  );
};

export default EditAccount;
