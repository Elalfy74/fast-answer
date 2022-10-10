import { Stack, TextField, Typography } from '@mui/material';
import { FormikProps } from 'formik';

import { FormikValues } from './UserDetails.types';
import { Input } from './utils';

type FieldsStackProps = {
  title: string;
  formik: FormikProps<FormikValues>;
  list: Input[];
};

const FieldsStack = ({ title, formik, list }: FieldsStackProps) => {
  return (
    <Stack>
      <Typography variant="h6" fontWeight="500" sx={{ pl: 2 }}>
        {title}
      </Typography>
      <Stack p={2} spacing={2} justifyContent="space-between">
        {list.map(({ name, label, type, readonly }) => (
          <Stack
            key={name}
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '14px', sm: 'inherit' },
                fontWeight: { xs: '500', sm: '400' },
                ml: { xs: 1, sm: 0 },
                width: '120px',
              }}
            >
              {label}
            </Typography>
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
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default FieldsStack;
