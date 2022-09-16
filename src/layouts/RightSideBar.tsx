import { Box } from '@mui/material';
import React from 'react';

function RightSideBar() {
  return (
    <Box
      borderRadius="8px"
      bgcolor="white"
      height="400px"
      p="8px"
      sx={{
        position: 'sticky',
        top: 20,
      }}
    >
      RightSideBar
    </Box>
  );
}

export default RightSideBar;
