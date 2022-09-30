import { HTMLInputTypeAttribute } from 'react';

export type Input = {
  name:
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'birthdate'
    | 'country'
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
    name: 'country',
    label: 'Country',
    type: 'text',
  },
];

export const EducationalInfoList: Input[] = [
  {
    name: 'college',
    label: 'College',
  },
];
