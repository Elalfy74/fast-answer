import { Box, Typography } from '@mui/material';

export const SecondHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="h6" fontWeight={600} px="2px">
      {children}
    </Typography>
  );
};

export const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="body2" mt="2px" mb="4px" px="2px">
      {children}
    </Typography>
  );
};

export const MarginBox = ({ children }: { children: React.ReactNode }) => {
  return <Box mb="24px">{children}</Box>;
};
