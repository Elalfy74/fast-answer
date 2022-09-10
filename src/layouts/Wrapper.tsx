import { Container, Grid } from "@mui/material";

import { LeftSideBar, RightSideBar } from "./";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Grid container spacing={{ xs: 2, lg: 4 }}>
        <Grid
          item
          xs={3}
          sm={2}
          md={1.5}
          xl={3}
          sx={{
            display: { xs: "none", sm: "block" },
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
          xl={2.5}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <RightSideBar />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Wrapper;
