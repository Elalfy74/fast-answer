import { Box, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { LeftSideBar, MiniLeftSideBar } from '.';
import BottomNavigationBar from './BottomNavigationBar';

const Wrapper = () => {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
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
            <Box
              sx={{
                display: {
                  xs: 'none',
                  xl: 'block',
                },
                position: 'sticky',
                top: 20,
              }}
            >
              <LeftSideBar />
            </Box>
            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                  xl: 'none',
                },
                position: 'sticky',
                top: 20,
              }}
            >
              <MiniLeftSideBar />
            </Box>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sm={10}
          md={10.5}
          xl={9}
          sx={{
            pt: '5px',
            pb: {
              xs: 15,
              sm: 0,
            },
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
      {mobile && <BottomNavigationBar />}
    </Container>
  );
};

export default Wrapper;
