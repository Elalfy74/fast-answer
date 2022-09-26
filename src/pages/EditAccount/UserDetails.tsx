import { Box, Divider, Stack, TextField, Typography } from '@mui/material';

import { ChildrenProps, User } from '../../data/types';

const GeneralInfoList = [
  {
    id: 1,
    name: 'First Name',
    value: 'FirstName',
  },
  {
    id: 2,
    name: 'Last Name',
    value: 'LastName',
  },
  {
    id: 3,
    name: 'Email',
    value: 'Email',
  },
  // {
  //   id: 4,
  //   name: 'Password',
  //   value: 'Password',
  // },
];

const PersonalInfoList = [
  {
    id: 1,
    name: 'Birth Date',
    value: 'Birthdate',
    type: 'date',
  },
  {
    id: 2,
    name: 'Location',
    value: 'Location',
    type: 'string',
  },
  {
    id: 3,
    name: 'Phone Number',
    value: 'PhoneNumber',
    type: 'number',
  },
];

const EducationalInfoList = [
  {
    id: 1,
    name: 'Major',
    value: 'Major',
  },
  {
    id: 2,
    name: 'University Level',
    value: 'UniversityLevel',
  },
  {
    id: 3,
    name: 'College',
    value: 'College',
  },
];

type EditFieldTextProps = {
  children: string;
};

const EditFieldText = ({ children }: EditFieldTextProps) => {
  return (
    <Typography
      sx={{
        fontSize: { xs: '14px', sm: 'inherit' },
        fontWeight: { xs: '500', sm: '400' },
        ml: { xs: 1, sm: 0 },
        width: '120px',
      }}
    >
      {children}
    </Typography>
  );
};

const StackEditField = ({ children }: ChildrenProps) => {
  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 0.5,
      }}
    >
      {children}
    </Stack>
  );
};

type UserDetailsProps = {
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => void;
  data: User;
};

const UserDetails = ({ onChangeHandler, data }: UserDetailsProps) => {
  return (
    <Box
      sx={{
        bgcolor: 'white',
        boxShadow: 2,
        borderRadius: 2,
        p: 2,
        order: {
          xs: 2,
          md: 1,
        },
      }}
    >
      <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
        USER DETAILS
      </Typography>
      <Divider />
      {/* Box holding two boxes inside one box is also two boxes */}
      <Stack spacing={2}>
        {/* Major Box contain General and personal info */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            mt: 2,
          }}
        >
          {/* 1/2 General Info Stack */}
          <Stack>
            <Typography variant="h6" fontWeight="500" sx={{ pl: 2 }}>
              General Information
            </Typography>
            <Stack p={2} spacing={2} justifyContent="space-between">
              {GeneralInfoList.map((listItem) => (
                <StackEditField key={listItem.id}>
                  <EditFieldText>{listItem.name}</EditFieldText>
                  <TextField
                    value={data![listItem.value as keyof User] || ''}
                    onChange={(e) => onChangeHandler(e, listItem.value)}
                    fullWidth
                    size="small"
                  />
                </StackEditField>
              ))}
            </Stack>
          </Stack>

          {/* 2/2 personal Stack */}
          <Stack>
            <Typography variant="h6" fontWeight="500" sx={{ pl: 2 }}>
              Personal Info
            </Typography>
            <Stack p={2} spacing={2} justifyContent="space-between">
              {PersonalInfoList.map((listItem) => (
                <StackEditField key={listItem.id}>
                  <EditFieldText>{listItem.name}</EditFieldText>
                  <TextField
                    type={listItem.type}
                    fullWidth
                    size="small"
                    value={data![listItem.value as keyof User] || ''}
                    onChange={(e) => onChangeHandler(e, listItem.value)}
                  />
                </StackEditField>
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* Education Stack */}
        <Stack>
          <Typography variant="h6" fontWeight="500" sx={{ pl: 2 }}>
            Education Info
          </Typography>
          <Stack p={2} spacing={2} justifyContent="space-between">
            {EducationalInfoList.map((listItem) => (
              <StackEditField key={listItem.id}>
                <EditFieldText>{listItem.name}</EditFieldText>
                <TextField
                  fullWidth
                  size="small"
                  value={data![listItem.value as keyof User] || ''}
                  onChange={(e) => onChangeHandler(e, listItem.value)}
                />
              </StackEditField>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserDetails;
