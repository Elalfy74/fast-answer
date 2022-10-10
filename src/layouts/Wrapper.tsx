import { Box, Container, Grid, SxProps, Theme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { LeftSideBar, MiniLeftSideBar, RightSideBar } from '.';

const styles: { [key: string]: SxProps<Theme> } = {
  container: { py: '20px' },
  leftGrid: {
    display: { xs: 'none', sm: 'block' },
  },
};

type WrapperProps = {
  full: boolean;
};

const Wrapper = ({ full }: WrapperProps) => {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 600) {
      setMobile(false);
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Grid container columnSpacing={{ xs: 3, lg: 4 }}>
        {!mobile && (
          <Grid item sm={2} md={1.5} xl={3} sx={styles.leftGrid}>
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
        {full && (
          <>
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
          </>
        )}

        {!full && (
          <Grid
            item
            xs={12}
            sm={10}
            md={10.5}
            xl={9}
            sx={{
              pb: {
                xs: 15,
                sm: 0,
              },
            }}
          >
            <Outlet />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Wrapper;
