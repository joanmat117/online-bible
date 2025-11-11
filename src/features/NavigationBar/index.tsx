"use client"

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState,useEffect } from 'react';
import {usePathname } from 'next/navigation';
import Link from 'next/link'
import { SolarHomeAngleBold, SolarNotebookMinimalisticBold, SolarSettingsMinimalisticBold } from '@/shared/ui/Icons';


export default function NavigationBar() {
  const [value, setValue] = useState('');
  const pathname = usePathname()

  useEffect(()=>{
    const firstPath = pathname.split('/')[1]
    setValue(firstPath)
  },[pathname])

  return <>
    <BottomNavigation sx={{ 
        width: '100%',
        p:'4px',
        '& .MuiBottomNavigationAction-label':{
          fontWeight:600
        }
        }} value={value}>
      <BottomNavigationAction
        sx={{borderRadius:'5px'}}  
        label="Inicio"
        LinkComponent={Link}
        href='/home'
        value="home"
        icon={<SolarHomeAngleBold/>}
      /> 

      <BottomNavigationAction
      sx={{borderRadius:'5px'}}  
        label="Leer"
        value="read"
        LinkComponent={Link}
        href='/read'
        icon={<SolarNotebookMinimalisticBold/>}
      />
      <BottomNavigationAction
      sx={{borderRadius:'5px'}}  
        label="Ajustes"
        LinkComponent={Link}
        href='/settings'
        value="settings"
        icon={<SolarSettingsMinimalisticBold/>}
      />
    </BottomNavigation>
    </>
}
