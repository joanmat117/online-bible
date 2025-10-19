"use client"

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { BookIcon, Bookmark, Home } from 'lucide-react';
import { useRef,useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import { useRouter,usePathname } from 'next/navigation';


export default function NavigationBar() {
  const [value, setValue] = useState('');
  const router = useRouter();
  const pathname = usePathname()
  const bar = useRef<HTMLElement>(null)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push("/"+newValue);
  };

  useEffect(()=>{
    const firstPath = pathname.split('/')[1]
    setValue(firstPath)
  },[pathname])

  return <>
    <BottomNavigation sx={{ 
        width: '100%'
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
