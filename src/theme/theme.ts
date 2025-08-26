import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#efaf00',
    },
    secondary: {
      main: '#0040ef',
    },
    success: {
      main: '#b7ef00',
    },
    text: {
      primary: '#111',
      secondary: '#555',
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#9ec500',
          '&.Mui-checked': {
            color: '#9ec500',
          },
        },
      },
    },
  },
});
