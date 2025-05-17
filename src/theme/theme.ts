import { createTheme } from '@mui/material/styles';

// Paleta de cores da EduConnect Angola
const theme = createTheme({
  palette: {
    primary: {
      main: '#0A58CA', // Azul Royal
      contrastText: '#FAFAFA',
    },
    secondary: {
      main: '#38B000', // Verde Ensino
      contrastText: '#FAFAFA',
    },
    error: {
      main: '#FF4D4D', // Vermelho Claro
    },
    background: {
      default: '#FAFAFA', // Branco Neve
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F1F1F', // Preto Suave
      secondary: '#666666',
    },
    divider: '#E5E5E5', // Cinza Claro
  },
  typography: {
    fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#0046B5',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#2A9000',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;
