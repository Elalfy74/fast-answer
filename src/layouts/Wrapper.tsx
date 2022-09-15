import { Container, Grid } from '@mui/material';
import { useLayoutEffect, useState } from 'react';

import { LeftSideBar, RightSideBar } from '.';
import BottomNavigationBar from './BottomNavigationBar';

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const [mobile, setMobile] = useState(true);

  useLayoutEffect(() => {
    if (window.innerWidth > 600) {
      setMobile(false);
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Grid container spacing={{ xs: 2, lg: 4 }}>
        <Grid
          item
          sm={2}
          md={1.5}
          xl={3}
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <LeftSideBar />
        </Grid>
        <Grid item xs={12} sm={10} md={8} xl={6.5}>
          {children}
        </Grid>
        <Grid
          item
          md={2.5}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <RightSideBar />
        </Grid>
      </Grid>
      {mobile && <BottomNavigationBar />}
    </Container>
  );
};

export default Wrapper;
