import { Box, Stack } from '@mui/material';

import { LoginForm, LoginSwiper } from '.';

const Login = () => {
  return (
    <Stack direction="row" alignItems="center" height="100vh">
      <LoginSwiper />
      <LoginForm />
    </Stack>
  );
};

export default Login;
