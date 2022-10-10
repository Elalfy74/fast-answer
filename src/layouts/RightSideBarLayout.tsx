import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { RightSideBar } from '.';

const RightSideBarLayout = () => {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 600) {
      setMobile(false);
    }
  }, []);

  return (
    <>
      <Grid
        item
        xs={12}
        md={9}
        lg={8.5}
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
          md={3}
          lg={3.5}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <RightSideBar />
        </Grid>
      )}
    </>
  );
};

export default RightSideBarLayout;
