import { Container, Grid } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { LeftSideBar, RightSideBar } from '.';
import BottomNavigationBar from './BottomNavigationBar';

const Wrapper = () => {
  const [mobile, setMobile] = useState(true);

  useLayoutEffect(() => {
    if (window.innerWidth > 600) {
      setMobile(false);
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: '20px' }}>
      <Grid container columnSpacing={{ xs: 3, lg: 4 }}>
        {!mobile && (
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
        )}
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          xl={6.5}
          sx={{
            pb: {
              xs: 15,
              sm: 0,
            },
          }}
        >
          <Outlet />
        </Grid>
        {!mobile && (
          <Grid
            item
            md={2.5}
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          >
            <RightSideBar />
          </Grid>
        )}
      </Grid>
      {mobile && <BottomNavigationBar />}
    </Container>
  );
};

export default Wrapper;
