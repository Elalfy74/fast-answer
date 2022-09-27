import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

import {
  EditFieldText,
  EducationalInfoList,
  GeneralInfoList,
  PersonalInfoList,
  StackEditField,
  validationSchema,
} from './CustomComponents';

type UserDetailsProps = {
  initialValues: {
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
    location: string;
    phoneNumber: string;
    major: string;
    college: string;
    universityLevel: string;
  };
};

const UserDetails = ({ initialValues }: UserDetailsProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
          <Stack>
            <Typography variant="h6" fontWeight="500" sx={{ pl: 2 }}>
              General Information
            </Typography>
            <Stack p={2} spacing={2} justifyContent="space-between">
              {GeneralInfoList.map(({ name, label, type, readonly }) => (
                <StackEditField key={name}>
                  <EditFieldText>{label}</EditFieldText>
                  <TextField
                    id={name}
                    name={name}
                    type={type}
                    fullWidth
                    size="small"
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    helperText={formik.touched[name] && formik.errors[name]}
                    disabled={readonly}
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
              {PersonalInfoList.map(({ name, label, type }) => (
                <StackEditField key={name}>
                  <EditFieldText>{label}</EditFieldText>
                  <TextField
                    id={name}
                    name={name}
                    type={type}
                    fullWidth
                    size="small"
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    helperText={formik.touched[name] && formik.errors[name]}
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
            {EducationalInfoList.map(({ name, label }) => (
              <StackEditField key={name}>
                <EditFieldText>{label}</EditFieldText>
                <TextField
                  id={name}
                  name={name}
                  fullWidth
                  size="small"
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  error={formik.touched[name] && Boolean(formik.errors[name])}
                  helperText={formik.touched[name] && formik.errors[name]}
                />
              </StackEditField>
            ))}
          </Stack>
        </Stack>
        {/* action buttons */}
        <Stack direction="row" spacing={2} sx={{ p: 2, mt: 2 }}>
          <LoadingButton
            // loading
            type="submit"
            variant="contained"
            sx={{ p: '6px 60px 6px 60px' }}
          >
            Save
          </LoadingButton>
          <Button sx={{ p: '6px 50px 6px 50px' }}>Cancel</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserDetails;
