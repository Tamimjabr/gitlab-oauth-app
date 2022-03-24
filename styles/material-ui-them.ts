import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#ADD2C9',
      main: '#5EA3A3',
      dark: '#488B8F',
      contrastText: 'white',
    },
    secondary: {
      light: '#FFFCDC',
      main: '#FFFEA9',
      dark: '#DAD9927',
      contrastText: '#000',
    },
  },
});