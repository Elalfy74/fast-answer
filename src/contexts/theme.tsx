import {
  colors,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material';

import { ChildrenProps } from '../data/types';

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      background: {
        default: '#F5F6F8',
      },
      primary: {
        main: '#5d45fa',
        '400': '#7762FA',
        '500': '#6F62D1',
      },
      secondary: {
        main: '#3B6893',
        '100': colors.blue[400],
        '200': colors.blueGrey[700],
      },
      info: {
        main: colors.grey[600],
      },
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      h6: {
        fontWeight: 500,
        fontSize: '1.1rem',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.4rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          textInfo: {
            color: colors.grey[700],
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          img: {
            objectFit: 'contain',
          },
          circular: {
            border: '1px solid rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
  })
);

const AppTheme = ({ children }: ChildrenProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default AppTheme;
