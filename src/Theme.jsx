import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const lightPalette = {
  main: '#7cacdc',
  background: {
    default: '#F0F6FC',
    paper: '#FFFF',
  },
  semi: '#BFC2C5',
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
        connected: '#00cc66',
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
    spacing: 4,
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '*::-webkit-scrollbar': {
            display: 'none',
          },
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
      MuiAppBar: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    props: {
      MuiButton: {
        disableRipple: true,
        variant: 'contained',
        color: 'primary',
      },
      MuiIconButton: {
        disableRipple: true,
        color: 'default',
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
      MuiToolbar: {
        disableGutters: true,
      },
    },
  });
}

export default function Theme(props) {
  return (
    <ThemeProvider theme={theme(props.type)}>
      <CssBaseline>{props.children}</CssBaseline>
    </ThemeProvider>
  );
}
