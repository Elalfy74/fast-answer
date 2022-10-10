import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { MiniLeftSideBar } from '.';

const MiniWrapper = () => {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 600) {
      setMobile(false);
    }
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100vh',
        py: {
          xs: 2,
          sm: '20px',
        },
        px: {
          xs: 0,
          sm: 1,
          md: 2,
        },
      }}
    >
      <Grid
        container
        columnSpacing={{ xs: 3, lg: 4 }}
        sx={{
          height: '100%',
          width: '100%',
        }}
      >
        {!mobile && (
          <Grid
            item
            sm={1.5}
            sx={{
              position: 'sticky',
              top: 20,
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
          >
            <MiniLeftSideBar />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sm={10.5}
          sx={{
            height: '100%',
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MiniWrapper;
