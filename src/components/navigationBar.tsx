"use client"

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState,useEffect } from 'react';
import { useRouter,usePathname } from 'next/navigation';
import { SolarBookmarkBold, SolarHomeAngleBold, SolarNotebookMinimalisticBold, SolarSettingsMinimalisticBold } from './icons';


export default function NavigationBar() {
  const [value, setValue] = useState('');
  const router = useRouter();
  const pathname = usePathname()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push("/"+newValue);
  };

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
        }} value={value} onChange={handleChange}>
      <BottomNavigationAction
      sx={{borderRadius:'5px'}}  
      label="Inicio"
        value="home"
        icon={<SolarHomeAngleBold/>}
      /> 

      <BottomNavigationAction
      sx={{borderRadius:'5px'}}  
        label="Leer"
        value="read"
        icon={<SolarNotebookMinimalisticBold/>}
      />
      <BottomNavigationAction
      sx={{borderRadius:'5px'}}  
        label="Ajustes"
        value="settings"
        icon={<SolarSettingsMinimalisticBold/>}
      />
    </BottomNavigation>
    </>
}
