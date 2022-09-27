import { Stack, Typography } from '@mui/material';
import { HTMLInputTypeAttribute } from 'react';
import * as Yup from 'yup';

import { ChildrenProps } from '../../data/types';

export const validationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  // phoneNumber: Yup.number(),
  // email: Yup.string().email('Email is invalid').required('Email is required'),
  // subject: Yup.string().required('Subject is required'),
  // message: Yup.string().required('Message is required'),
});

type Input = {
  name:
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'birthdate'
    | 'location'
    | 'phoneNumber'
    | 'major'
    | 'universityLevel'
    | 'college';
  label: string;
  type?: HTMLInputTypeAttribute;
  readonly?: boolean;
};

export const GeneralInfoList: Input[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    readonly: true,
  },
];

export const PersonalInfoList: Input[] = [
  {
    name: 'birthdate',
    label: 'Birth Date',
    type: 'date',
  },
  {
    name: 'location',
    label: 'Location',
    type: 'text',
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'number',
  },
];

export const EducationalInfoList: Input[] = [
  {
    name: 'major',
    label: 'Major',
  },
  {
    name: 'universityLevel',
    label: 'University Level',
  },
  {
    name: 'college',
    label: 'College',
  },
];

type EditFieldTextProps = {
  children: string;
};

export const EditFieldText = ({ children }: EditFieldTextProps) => {
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

export const StackEditField = ({ children }: ChildrenProps) => {
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
