import React from 'react';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const lightPalette = {
  main: '#8AA3BC',
  background: '#F0F6FC',
  middle: '#8A949E',
  semi: '#6A6E74',
  contrastText: '#0D1117',
};

const darkPalette = {
  main: '#8AA3BC',
  background: '#0D1117',
  middle: '#161B22',
  semi: '#21262D',
  contrastText: '#F0F6FC',
};

const theme = (mode) =>
  createTheme({
    ...CssBaseline,
    palette: {
      type: mode === 'light' ? 'light' : 'dark',
      primary: mode === 'light' ? lightPalette : darkPalette,
      secondary: {
        main: '#5237A9',
      },
    },
    typography: {
      fontFamily: 'Inter',
    },
    shape: {
      borderRadius: 4,
    },
    overrides: {
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

export default function Theme({ children }) {
  return (
    <MuiThemeProvider theme={theme('light')}>
      <CssBaseline>{children}</CssBaseline>
    </MuiThemeProvider>
  );
}
