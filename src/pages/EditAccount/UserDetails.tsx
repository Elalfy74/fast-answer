import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { FormikProps, useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import { updateUserData } from '../../services/users';
import FieldsStack from './FieldsStack';
import {
  EducationalInfoList,
  GeneralInfoList,
  PersonalInfoList,
} from './utils';

const validationSchema = Yup.object({
  FirstName: Yup.string().required('Required'),
  LastName: Yup.string().required('Required'),
});

export type FormikValues = {
  FirstName: string;
  LastName: string;
  Email: string;
  Birthdate: string;
  Country: string;
  PhoneNumber: string;
  Major: string;
  College: string;
  UniversityLevel: string;
};

type UserDetailsProps = {
  initialValues: FormikValues;
  userId: string;
};

const UserDetails = ({ initialValues, userId }: UserDetailsProps) => {
  const { mutate, isLoading } = useMutation(updateUserData, {
    onSuccess: () => {},
  });

  const formik: FormikProps<FormikValues> = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, submitProps) => {
      const { Email, ...sentValues } = { ...values };

      mutate({ id: userId, ...sentValues });

      submitProps.resetForm({ values });
    },
  });

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
      <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
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
          <FieldsStack
            title="General Information"
            formik={formik}
            list={GeneralInfoList}
          />
          {/* 2/2 personal Stack */}
          <FieldsStack
            title="Personal Info"
            formik={formik}
            list={PersonalInfoList}
          />
        </Box>
        {/* Education Stack */}
        <FieldsStack
          title="Education Info"
          formik={formik}
          list={EducationalInfoList}
        />

        {/* action buttons */}
        <Stack direction="row" spacing={2} sx={{ p: 2, mt: 2 }}>
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            sx={{ p: '6px 60px 6px 60px' }}
            disabled={!formik.dirty}
          >
            Save
          </LoadingButton>
          <Button
            sx={{ p: '6px 50px 6px 50px' }}
            disabled={!formik.dirty}
            onClick={() => formik.resetForm()}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserDetails;
