import { FormikValues } from '../pages/EditAccount/UserDetails';

export type SaveUserDataParams = {
  email: string;
  firstName: string;
  lastName: string;
};

export type UpdateUserAvatarParams = {
  id: string;
  avatar: string;
  bio: string;
  userName: string;
};

export type UpdateUserDetailsParams = Omit<FormikValues, 'email'> & {
  id: string;
};
