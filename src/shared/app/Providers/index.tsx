"use client"
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ReactNode } from 'react';
import { MuiThemeProvider } from '@/shared/contexts/MuiThemeContext';
import { AppStoreProvider } from '@/shared/contexts/store';

export function Providers({children}:{children:ReactNode}){
    return <>
      <MuiThemeProvider>

        <AppRouterCacheProvider>
          <CssBaseline/>
          <AppStoreProvider>
            {children}
          </AppStoreProvider>
        </AppRouterCacheProvider>
      </MuiThemeProvider>
    </>
}
