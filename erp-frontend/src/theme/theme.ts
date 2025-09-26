import { alpha, createTheme } from '@mui/material/styles';
import type { PaletteMode, PaletteOptions, Theme } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

export const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const buildPalette = (mode: PaletteMode): PaletteOptions => {
  if (mode === 'light') {
    return {
      mode,
      primary: {
        main: '#5A31F4',
        light: '#8F6CFF',
        dark: '#3E1BC5',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#FF6B8A',
        light: '#FF8CA8',
        dark: '#C9426A',
        contrastText: '#ffffff',
      },
      info: {
        main: '#21D4FD',
        light: '#6DE3FF',
        dark: '#10A6CA',
        contrastText: '#0B0E19',
      },
      success: {
        main: '#2ED573',
        light: '#5AE490',
        dark: '#1CAA55',
        contrastText: '#0B0E19',
      },
      warning: {
        main: '#FFB648',
        light: '#FFD27F',
        dark: '#D68824',
        contrastText: '#0B0E19',
      },
      error: {
        main: '#FF5F6D',
        light: '#FF8A96',
        dark: '#D93A47',
        contrastText: '#ffffff',
      },
      background: {
        default: '#F4F6FF',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#1F1A4F',
        secondary: '#596080',
      },
      divider: 'rgba(95, 96, 128, 0.16)',
      common: {
        black: '#0B0E19',
        white: '#ffffff',
      },
      grey: {
        100: '#EEF1FF',
        200: '#E0E5FF',
        300: '#CCD2F7',
        400: '#9CA4D7',
        500: '#6E75A5',
        600: '#595F87',
        700: '#44476A',
        800: '#2F324C',
        900: '#1B1D33',
      },
    };
  }

  return {
    mode,
    primary: {
      main: '#8C7CFF',
      light: '#B5AFFF',
      dark: '#685BFF',
      contrastText: '#0B0E19',
    },
    secondary: {
      main: '#FF8BA3',
      light: '#FFACC0',
      dark: '#D66480',
      contrastText: '#0B0E19',
    },
    info: {
      main: '#4BB9F8',
      light: '#77CBFF',
      dark: '#248CC9',
      contrastText: '#0B0E19',
    },
    success: {
      main: '#48E2A4',
      light: '#7EF5C3',
      dark: '#19B476',
      contrastText: '#0B0E19',
    },
    warning: {
      main: '#FFCB63',
      light: '#FFE09A',
      dark: '#D9A242',
      contrastText: '#0B0E19',
    },
    error: {
      main: '#FF7B84',
      light: '#FF9CA3',
      dark: '#D9575C',
      contrastText: '#0B0E19',
    },
    background: {
      default: '#0F1324',
      paper: '#171C33',
    },
    text: {
      primary: '#E9EAFB',
      secondary: '#A5AAD4',
    },
    divider: 'rgba(165, 170, 212, 0.24)',
    common: {
      black: '#05070F',
      white: '#F5F6FF',
    },
    grey: {
      100: '#1F243D',
      200: '#272D49',
      300: '#323857',
      400: '#3C4265',
      500: '#474D73',
      600: '#52587F',
      700: '#5D638C',
      800: '#687098',
      900: '#737BA5',
    },
  };
};

const baseTypography = {
  fontFamily: poppins.style.fontFamily,
  h1: {
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  h2: {
    fontWeight: 700,
    letterSpacing: '-0.4px',
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
  subtitle1: {
    fontWeight: 500,
    letterSpacing: '0.02em',
  },
  button: {
    textTransform: 'none' as const,
    fontWeight: 600,
    letterSpacing: '0.04em',
  },
};

const applyComponentOverrides = (theme: Theme) => {
  const isLight = theme.palette.mode === 'light';
  const gradientBackground = `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;

  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          backgroundImage: isLight
            ? 'radial-gradient(circle at 12% 20%, rgba(90, 49, 244, 0.18) 0%, rgba(244, 246, 255, 0) 48%), radial-gradient(circle at 85% 8%, rgba(33, 212, 253, 0.18) 0%, rgba(244, 246, 255, 0) 52%)'
            : 'radial-gradient(circle at 5% 5%, rgba(140, 124, 255, 0.28) 0%, rgba(15, 19, 36, 0) 42%), radial-gradient(circle at 95% 10%, rgba(75, 185, 248, 0.22) 0%, rgba(15, 19, 36, 0) 48%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          transition: 'background 0.4s ease',
        },
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.35),
          borderRadius: 999,
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: alpha(theme.palette.common.white, isLight ? 0.6 : 0.04),
        },
        '::selection': {
          backgroundColor: alpha(theme.palette.secondary.main, 0.35),
          color: theme.palette.secondary.contrastText,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: theme.spacing(2.5),
          paddingRight: theme.spacing(2.5),
        },
        contained: {
          backgroundImage: gradientBackground,
          boxShadow: isLight
            ? '0 18px 35px -18px rgba(90, 49, 244, 0.55)'
            : '0 18px 35px -18px rgba(0, 0, 0, 0.65)',
          color: theme.palette.getContrastText(theme.palette.primary.main),
          '&:hover': {
            backgroundImage: gradientBackground,
            transform: 'translateY(-1px)',
            boxShadow: isLight
              ? '0 22px 40px -18px rgba(90, 49, 244, 0.65)'
              : '0 22px 40px -18px rgba(0, 0, 0, 0.72)',
          },
        },
        outlined: {
          borderColor: alpha(theme.palette.primary.main, 0.4),
          color: theme.palette.primary.main,
          '&:hover': {
            borderColor: alpha(theme.palette.primary.main, 0.6),
            backgroundColor: alpha(theme.palette.primary.main, 0.06),
          },
        },
        text: {
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: theme.spacing(3),
          boxShadow: isLight
            ? '0 25px 60px -35px rgba(90, 49, 244, 0.55)'
            : '0 30px 70px -35px rgba(5, 7, 15, 0.85)',
          border: `1px solid ${alpha(theme.palette.primary.main, isLight ? 0.12 : 0.28)}`,
          backgroundImage: isLight
            ? 'linear-gradient(150deg, rgba(255, 255, 255, 0.95) 0%, rgba(238, 241, 255, 0.92) 100%)'
            : 'linear-gradient(150deg, rgba(23, 28, 51, 0.95) 0%, rgba(14, 17, 38, 0.94) 100%)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: isLight
              ? '0 32px 70px -40px rgba(90, 49, 244, 0.65)'
              : '0 32px 70px -40px rgba(5, 7, 15, 0.9)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: `1px solid ${alpha(theme.palette.primary.main, isLight ? 0.08 : 0.24)}`,
          backgroundImage: isLight
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(243, 245, 255, 0.9) 100%)'
            : 'linear-gradient(140deg, rgba(23, 28, 51, 0.92) 0%, rgba(10, 12, 28, 0.9) 100%)',
          boxShadow: isLight
            ? '0 15px 45px -30px rgba(90, 49, 244, 0.45)'
            : '0 20px 55px -35px rgba(0, 0, 0, 0.8)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: gradientBackground,
          boxShadow: isLight
            ? '0 18px 45px -30px rgba(90, 49, 244, 0.65)'
            : '0 18px 45px -30px rgba(0, 0, 0, 0.65)',
          borderBottom: `1px solid ${alpha(theme.palette.common.white, isLight ? 0.22 : 0.1)}`,
          backdropFilter: 'blur(16px)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundImage: gradientBackground,
          color: theme.palette.secondary.contrastText,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        colorPrimary: {
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          color: theme.palette.primary.main,
        },
      },
    },
  };
};

export const createERPTheme = (mode: PaletteMode) => {
  const theme = createTheme({
    palette: buildPalette(mode),
    shape: {
      borderRadius: 18,
    },
    typography: baseTypography,
  });

  theme.shadows[1] = mode === 'light'
    ? '0 12px 32px -20px rgba(90, 49, 244, 0.35)'
    : '0 12px 32px -20px rgba(0, 0, 0, 0.65)';
  theme.shadows[4] = mode === 'light'
    ? '0 18px 45px -30px rgba(90, 49, 244, 0.4)'
    : '0 20px 50px -28px rgba(0, 0, 0, 0.7)';

  theme.components = {
    ...theme.components,
    ...applyComponentOverrides(theme),
  };

  return theme;
};

const theme = createERPTheme('light');

export default theme;
