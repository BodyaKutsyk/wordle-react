import { createTheme } from '@mui/material';

export const boxStyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  color: '#97a2ac',
  bgcolor: '#172d41',
  outline: 'none',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  gap: '16px',
  zIndex: 1,
  borderRadius: '8px',
};

declare module '@mui/material/styles' {
  interface Palette {
    dark: Palette['primary'];
  }

  interface PaletteOptions {
    dark?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    dark: true;
  }
}

export let theme = createTheme({});

theme = createTheme(theme, {
  palette: {
    dark: theme.palette.augmentColor({
      color: {
        main: '#1c2833',
        contrastText: '#97a2ac',
      },
      name: 'dark',
    }),
  },
});
