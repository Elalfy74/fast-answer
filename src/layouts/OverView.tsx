import { Box, Modal, SxProps, Theme } from '@mui/material';
import { useState } from 'react';
import ReactDOM from 'react-dom';

import { ChildrenProps } from '../data/global.types';

const style: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

type OverviewProps = ChildrenProps & {
  status: boolean;
  handleClose: any;
};
const OverView = ({ children, status, handleClose }: OverviewProps) => {
  return ReactDOM.createPortal(
    <Modal open={status} onClose={handleClose}>
      <Box sx={style}>{children}</Box>
    </Modal>,
    document.getElementById('model') as HTMLElement
  );
};

export default OverView;
