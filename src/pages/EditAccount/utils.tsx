import { HTMLInputTypeAttribute } from 'react';
import * as Yup from 'yup';

export const validationSchema = Yup.object({
  FirstName: Yup.string().required('Required'),
  LastName: Yup.string().required('Required'),
});

export type Input = {
  name:
    | 'Email'
    | 'FirstName'
    | 'LastName'
    | 'Birthdate'
    | 'Country'
    | 'PhoneNumber'
    | 'Major'
    | 'UniversityLevel'
    | 'College';
  label: string;
  type?: HTMLInputTypeAttribute;
  readonly?: boolean;
};

export const GeneralInfoList: Input[] = [
  {
    name: 'FirstName',
    label: 'First Name',
    type: 'text',
  },
  {
    name: 'LastName',
    label: 'Last Name',
    type: 'text',
  },
  {
    name: 'Email',
    label: 'Email',
    type: 'email',
    readonly: true,
  },
];

export const PersonalInfoList: Input[] = [
  {
    name: 'Birthdate',
    label: 'Birth Date',
    type: 'date',
  },
  {
    name: 'Country',
    label: 'Country',
    type: 'text',
  },
  {
    name: 'PhoneNumber',
    label: 'Phone Number',
    type: 'number',
  },
];

export const EducationalInfoList: Input[] = [
  {
    name: 'Major',
    label: 'Major',
  },
  {
    name: 'UniversityLevel',
    label: 'University Level',
  },
  {
    name: 'College',
    label: 'College',
  },
];
