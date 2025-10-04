import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { createTheme, PaletteMode, Theme, ThemeProvider,responsiveFontSizes } from '@mui/material/styles';

type ContextType = {
    theme: Theme;
    toggleTheme: () => void;
    mode: PaletteMode;
}|null

const ThemeContext = createContext<ContextType>(null);

export const ThemeMuiProvider = ({ children }:{children:ReactNode}) => {
  const [mode, setMode] = useState<PaletteMode>('light')

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => responsiveFontSizes(createTheme({
        palette: {
          mode: mode,
          primary: {
            main: '#ffab40',
          },
          secondary: {
            main: '#f50057',
          },
        },
      })),
    [mode]
  );

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