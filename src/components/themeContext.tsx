"use client"
import { createContext, ReactNode,useEffect, useContext, useMemo, useState } from 'react';
import { createTheme, PaletteMode, Theme, ThemeProvider,responsiveFontSizes } from '@mui/material/styles';

type ContextType = {
    theme: Theme;
    toggleTheme: () => void;
    mode: PaletteMode;
}|null

const ThemeContext = createContext<ContextType>(null);

export const ThemeMuiProvider = ({ children }:{children:ReactNode}) => {
  const [mode, setMode] = useState<PaletteMode>('light')
  
  useEffect(() => {
    setMode(()=>(localStorage.getItem('themeMode')||'light')as PaletteMode)
  }, [])

  const toggleTheme = () => {
    setMode((prevMode) =>{
    const newMode = prevMode === 'light' ? 'dark' : 'light'
    localStorage.setItem('themeMode',newMode)
    return newMode
    });
  };

  
const theme = useMemo(() =>
  responsiveFontSizes(createTheme({
    
    palette: {
      mode,
      primary: { main: mode === 'dark'? '#0f6cd6': '#0f6cd6' }, //#1565C0
      secondary: { main: '#F9A825' },
      background: {
        default: mode === 'dark' ? '#0b0b0e' : '#fafafa',
        paper: mode === 'dark' ? '#15151a' : '#fff',
      },
    },
    components: {
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
            margin: 8,
          },
          switchBase: {
            padding: 1,
            '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
              transform: 'translateX(16px)',
              color: '#fff',
              '& + $track': {
                opacity: 1,
                border: 'none',
              },
            },
          },
          thumb: {
            width: 24,
            height: 24,
          },
          track: {
            borderRadius: 13,
            border: '1px solid #bdbdbd',
            backgroundColor: '#fafafa',
            opacity: 1,
            transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          },
        },
      },
    },
    shape: {
      borderRadius: 8,
    },
  })),
[mode]);

  const value = {
    theme,
    toggleTheme,
    mode
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};
