"use client"
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ReactNode } from 'react';
import { MuiThemeProvider } from '@/shared/contexts/MuiThemeContext';

export function Providers({children}:{children:ReactNode}){
    return <>
      <MuiThemeProvider>

        <AppRouterCacheProvider>
          <CssBaseline/>
            {children}
        </AppRouterCacheProvider>
      </MuiThemeProvider>
    </>
}
