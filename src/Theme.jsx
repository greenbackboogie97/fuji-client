import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const lightPalette = {
  main: '#7cacdc',
  background: {
    default: '#F0F6FC',
    paper: '#F0F6FC',
  },
  semi: '#6A6E74',
  contrastText: '#0D1117',
};

const darkPalette = {
  main: '#7cacdc',
  background: {
    default: '#0D1117',
    paper: '#161B22',
  },
  semi: '#21262D',
  contrastText: '#F0F6FC',
};

function theme(mode) {
  return createTheme({
    palette: {
      type: mode === 'light' ? 'light' : 'dark',
      primary: mode === 'light' ? lightPalette : darkPalette,
      secondary: {
        main: '#BC012D',
      },
    },
    typography: {
      fontFamily: 'Inter',
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '#root': {
            backgroundColor: mode === 'dark' ? '#0D1117' : '#F7F9FC',
          },
        },
      },
      MuiButton: {
        root: {
          textTransform: 'none',
        },
      },
    },
    props: {
      MuiButton: {
        disableRipple: true,
        variant: 'contained',
        color: 'primary',
      },
      MuiCheckbox: {
        disableRipple: true,
      },
      MuiTextField: {
        variant: 'outlined',
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  });
}

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme('dark')}>
      <CssBaseline>{children}</CssBaseline>
    </ThemeProvider>
  );
}
