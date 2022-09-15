import { colors, createTheme } from '@mui/material';

// eslint-disable-next-line import/prefer-default-export
export const theme = createTheme({
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        textInfo: {
          color: colors.grey[700],
        },
      },
    },
  },
});
