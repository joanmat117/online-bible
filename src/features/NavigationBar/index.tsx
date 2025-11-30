"use client"

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import { SolarHomeAngleBold, SolarNotebookMinimalisticBold, SolarSettingsMinimalisticBold } from '@/shared/ui/Icons';

const navigationItems = [
    {
      label: "Inicio",
      value: "home",
      href: '/home',
      icon: <SolarHomeAngleBold />
    },
    {
      label: "Leer",
      value: "read",
      href: '/read',
      icon: <SolarNotebookMinimalisticBold />
    },
    {
      label: "Ajustes",
      value: "settings",
      href: '/settings',
      icon: <SolarSettingsMinimalisticBold />
    }
  ];


export default function NavigationBar() {
  const [value, setValue] = useState('');
  const pathname = usePathname();
  
  useEffect(() => {
    const firstPath = pathname.split('/')[1];
    setValue(firstPath);
  }, [pathname]);

  return (
    <BottomNavigation 
      sx={{ 
        width: '100%',
        p: '4px',
        backgroundColor: '#10101a',
        '& .MuiBottomNavigationAction-label': {
          fontWeight: 600
        }
      }} 
      value={value}
    >
      {navigationItems.map((item) => (
        <BottomNavigationAction
          key={item.value}
          sx={{ 
            borderRadius: '15px',
            color:'#fff'
          }}  
          label={item.label}
          LinkComponent={Link}
          href={item.href}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </BottomNavigation>
  );
}
