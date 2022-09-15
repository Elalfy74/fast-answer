import { Box, Stack } from '@mui/material';
import { useLayoutEffect, useState } from 'react';

import { LoginForm, LoginSwiper } from '.';

const Login = () => {
  const [desktop, setDesktop] = useState(false);

  useLayoutEffect(() => {
    if (window.innerWidth >= 1200) {
      setDesktop(true);
    }
  }, []);

  return (
    <Stack
      direction="row"
      alignItems="center"
      height="100vh"
      sx={{
        display: {
          xs: 'block',
          lg: 'flex',
        },
      }}
    >
      {desktop && <LoginSwiper />}
      <LoginForm />
    </Stack>
  );
};

export default Login;
