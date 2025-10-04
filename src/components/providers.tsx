"use client"
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeOptions, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ReactNode } from 'react';
import { ThemeMuiProvider } from './themeContext';

export function Providers({children}:{children:ReactNode}){
    return <>
      <ThemeMuiProvider>

        <AppRouterCacheProvider>
          <CssBaseline/>
            {children}
        </AppRouterCacheProvider>
      </ThemeMuiProvider>
    </>
}