import { FormikState } from 'formik';

export type FormikValues = {
  avatar: string;
  bio: string;
  userName: string;
};

export type AvatarBoxProps = {
  initialValues: FormikValues;
};

export type ResetForm = (
  nextState?: Partial<FormikState<FormikValues>> | undefined
) => void;
