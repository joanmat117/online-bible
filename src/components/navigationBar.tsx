"use client"

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { BookIcon, Bookmark, Home } from 'lucide-react';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';


export default function NavigationBar() {
  const [value, setValue] = React.useState('');
  const router = useRouter();
  const bar = useRef<HTMLElement>(null)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push("/"+newValue);
  };

  return <>
    <Box sx={{ 
      height: 56
    }}></Box>
    <BottomNavigation sx={{ 
        width: '100dvw' ,
        position:'fixed',
        bottom:'0',
        left:'0'
        }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Inicio"
        value="home"
        icon={<Home/>}
      /> 

      <BottomNavigationAction
        label="Leer"
        value="read"
        icon={<BookIcon/>}
      />
      <BottomNavigationAction
        label="Ajustes"
        value="settings"
        icon={<Bookmark/>}
      />
    </BottomNavigation>
    </>
}
