"use client"
import {useTheme} from '@/components/themeContext'
import { Switch } from '@mui/material'

export function ThemeSwitch(){
  const {toggleTheme,mode} = useTheme()

  return <>
  <Switch checked={mode == 'dark'? true:false} onChange={()=>toggleTheme()} />
  </>
}
