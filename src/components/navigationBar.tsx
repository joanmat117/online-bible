"use client"

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { BookIcon, Bookmark, Home } from 'lucide-react';
import { useState,useEffect } from 'react';
import { useRouter,usePathname } from 'next/navigation';


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
        p:'4px'
        }} value={value} onChange={handleChange}>
      <BottomNavigationAction
      sx={{borderRadius:'15px'}}  
      label="Inicio"
        value="home"
        icon={<Home/>}
      /> 

      <BottomNavigationAction
      sx={{borderRadius:'15px'}}  
        label="Leer"
        value="read"
        icon={<BookIcon/>}
      />
      <BottomNavigationAction
      sx={{borderRadius:'15px'}}  
        label="Ajustes"
        value="settings"
        icon={<Bookmark/>}
      />
    </BottomNavigation>
    </>
}
