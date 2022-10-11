import { LocationOnOutlined } from '@mui/icons-material';
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';

import { TagsList } from '../../components';
import { User } from '../../data/global.types';
import { UserProfileActions } from '.';

type UserDataProps = {
  data: User | undefined;
  userId: string | undefined;
};

const UserData = ({ data, userId }: UserDataProps) => {
  return (
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
        {/* Actions */}
        <UserProfileActions userId={userId} />
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
  );
};

export default UserData;
