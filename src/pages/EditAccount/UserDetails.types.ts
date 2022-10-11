export type FormikValues = {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  country: string;
  gender: string;
  university: string;
  jobTitle: string;
};

export type UserDetailsProps = {
  initialValues: FormikValues;
  userId: string;
};
