import { ThemeOptions } from '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles' {
  // eslint-disable-next-line prettier/prettier
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
