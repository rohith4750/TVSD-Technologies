import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { ThemeConfig, ThemeType } from '@/types';

interface ThemePaletteDef {
  mode: 'light' | 'dark';
  primary: { main: string; light: string; dark: string; contrastText: string };
  secondary: { main: string; light: string; dark: string; contrastText: string };
  background: { default: string; paper: string; surfaceSubtle: string };
  text: { primary: string; secondary: string; disabled: string };
  border: string;
  divider: string;
  accentGradient?: string;
  cardShadow: string;
}

export const THEMES_LIST: ThemeConfig[] = [
  {
    id: 'corporate-light',
    name: 'Corporate Light',
    description: 'Clean slate & royal blue designed for high-density enterprise operations.',
    mode: 'light',
    previewColors: {
      primary: '#1e40af',
      secondary: '#0284c7',
      background: '#f8fafc',
      card: '#ffffff',
    },
  },
  {
    id: 'corporate-dark',
    name: 'Corporate Dark',
    description: 'Deep midnight obsidian with vivid cyan highlights and reduced eye fatigue.',
    mode: 'dark',
    previewColors: {
      primary: '#38bdf8',
      secondary: '#818cf8',
      background: '#0b0f19',
      card: '#111827',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Monochrome precision, stark high-contrast typography, and understated luxury.',
    mode: 'light',
    previewColors: {
      primary: '#09090b',
      secondary: '#71717a',
      background: '#fafafa',
      card: '#ffffff',
    },
  },
  {
    id: 'healthcare-blue',
    name: 'Healthcare Blue',
    description: 'Calming clinical teal and mint tailored for medical & life sciences.',
    mode: 'light',
    previewColors: {
      primary: '#0891b2',
      secondary: '#14b8a6',
      background: '#f0fdfa',
      card: '#ffffff',
    },
  },
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    description: 'Future-forward electric violet & fuchsia gradient with glowing glass accents.',
    mode: 'dark',
    previewColors: {
      primary: '#a855f7',
      secondary: '#ec4899',
      background: '#0c071e',
      card: '#170f38',
    },
  },
];

export const THEME_PALETTES: Record<ThemeType, ThemePaletteDef> = {
  'corporate-light': {
    mode: 'light',
    primary: {
      main: '#1e40af',
      light: '#3b82f6',
      dark: '#1e3a8a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
      surfaceSubtle: '#f1f5f9',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      disabled: '#94a3b8',
    },
    border: '#e2e8f0',
    divider: '#f1f5f9',
    cardShadow: '0 4px 14px rgba(15, 23, 42, 0.05)',
  },

  'corporate-dark': {
    mode: 'dark',
    primary: {
      main: '#38bdf8',
      light: '#7dd3fc',
      dark: '#0284c7',
      contrastText: '#082f49',
    },
    secondary: {
      main: '#818cf8',
      light: '#a5b4fc',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0b0f19',
      paper: '#111827',
      surfaceSubtle: '#1e293b',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      disabled: '#64748b',
    },
    border: '#1f2937',
    divider: '#1f2937',
    cardShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
  },

  'minimal': {
    mode: 'light',
    primary: {
      main: '#09090b',
      light: '#27272a',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#71717a',
      light: '#a1a1aa',
      dark: '#3f3f46',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
      surfaceSubtle: '#f4f4f5',
    },
    text: {
      primary: '#09090b',
      secondary: '#52525b',
      disabled: '#a1a1aa',
    },
    border: '#e4e4e7',
    divider: '#f4f4f5',
    cardShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },

  'healthcare-blue': {
    mode: 'light',
    primary: {
      main: '#0891b2',
      light: '#22d3ee',
      dark: '#0e7490',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#14b8a6',
      light: '#5eead4',
      dark: '#0f766e',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f0fdfa',
      paper: '#ffffff',
      surfaceSubtle: '#ccfbf1',
    },
    text: {
      primary: '#134e4a',
      secondary: '#0f766e',
      disabled: '#99f6e4',
    },
    border: '#99f6e4',
    divider: '#e6fffa',
    cardShadow: '0 4px 14px rgba(8, 145, 178, 0.08)',
  },

  'modern-gradient': {
    mode: 'dark',
    primary: {
      main: '#a855f7',
      light: '#c084fc',
      dark: '#7e22ce',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0c071e',
      paper: '#170f38',
      surfaceSubtle: '#22164f',
    },
    text: {
      primary: '#f5f3ff',
      secondary: '#c4b5fd',
      disabled: '#7c3aed',
    },
    border: '#3b2575',
    divider: '#2d1b5a',
    accentGradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    cardShadow: '0 8px 32px rgba(168, 85, 247, 0.15)',
  },
};

export function createAppTheme(themeType: ThemeType): Theme {
  const paletteDef = THEME_PALETTES[themeType] || THEME_PALETTES['corporate-light'];

  const themeOptions: ThemeOptions = {
    palette: {
      mode: paletteDef.mode,
      primary: paletteDef.primary,
      secondary: paletteDef.secondary,
      background: {
        default: paletteDef.background.default,
        paper: paletteDef.background.paper,
      },
      text: paletteDef.text,
      divider: paletteDef.divider,
    },
    typography: {
      fontFamily: 'var(--font-poppins), Poppins, -apple-system, sans-serif',
      h1: { fontWeight: 700, letterSpacing: '-0.025em' },
      h2: { fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontWeight: 600, letterSpacing: '-0.02em' },
      h4: { fontWeight: 600, letterSpacing: '-0.01em' },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      subtitle2: { fontWeight: 500 },
      body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
      body2: { fontSize: '0.84375rem', lineHeight: 1.55 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
      borderRadius: themeType === 'minimal' ? 4 : 10,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: paletteDef.background.default,
            color: paletteDef.text.primary,
            transition: 'background-color 0.25s ease, color 0.25s ease',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: themeType === 'minimal' ? 4 : 8,
            padding: '8px 18px',
            fontSize: '0.875rem',
            fontFamily: 'inherit',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: themeType === 'minimal' ? 6 : 12,
            border: `1px solid ${paletteDef.border}`,
            boxShadow: paletteDef.cardShadow,
            transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
            fontSize: '0.875rem',
            borderColor: paletteDef.border,
            padding: '12px 16px',
          },
          head: {
            fontWeight: 600,
            color: paletteDef.text.secondary,
            backgroundColor: paletteDef.background.surfaceSubtle,
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: themeType === 'minimal' ? 4 : 8,
            backgroundColor: paletteDef.background.paper,
            fontFamily: 'inherit',
            '& fieldset': {
              borderColor: paletteDef.border,
            },
            '&:hover fieldset': {
              borderColor: paletteDef.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderWidth: 1.5,
              borderColor: paletteDef.primary.main,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
            fontFamily: 'inherit',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 14,
            border: `1px solid ${paletteDef.border}`,
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.25)',
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
}

export function applyThemeVariables(themeType: ThemeType): void {
  if (typeof document === 'undefined') return;
  const p = THEME_PALETTES[themeType] || THEME_PALETTES['corporate-light'];
  const root = document.documentElement;

  root.setAttribute('data-theme', themeType);
  root.setAttribute('data-mode', p.mode);

  root.style.setProperty('--color-primary', p.primary.main);
  root.style.setProperty('--color-primary-light', p.primary.light);
  root.style.setProperty('--color-primary-dark', p.primary.dark);
  root.style.setProperty('--color-primary-contrast', p.primary.contrastText);
  root.style.setProperty('--color-secondary', p.secondary.main);
  root.style.setProperty('--color-bg-default', p.background.default);
  root.style.setProperty('--color-bg-paper', p.background.paper);
  root.style.setProperty('--color-bg-subtle', p.background.surfaceSubtle);
  root.style.setProperty('--color-text-primary', p.text.primary);
  root.style.setProperty('--color-text-secondary', p.text.secondary);
  root.style.setProperty('--color-border', p.border);
  root.style.setProperty('--color-divider', p.divider);
  root.style.setProperty('--card-shadow', p.cardShadow);
}
