"use client"
import {Box} from '@mui/material'
import { SolarChatLineLinear, SolarMoonBold, SolarNotebookBookmarkBold } from './icons'
import {useTheme} from '@/components/themeContext'
import {useRouter} from 'next/navigation'
import { SettingsGridButton } from './settingsGridButton'

export function SettingsGrid(){
  const {toggleTheme,mode} = useTheme()
  return <Box sx={{
    display:'flex',
    flexWrap:'wrap',
    gap:2,
    p:2
  }}>
    <SettingsGridButton
    icon={<SolarMoonBold/>}
    label='Modo Oscuro'
    onClick={()=>{
      toggleTheme()
    }}
    sx={{
      backgroundColor:mode == 'dark'? 'primary.main':undefined,
    }}
    >
    </SettingsGridButton>
    <SettingsGridButton
    icon={<SolarNotebookBookmarkBold/>}
    label='Versiculos Guardados'
    href='/saved'    
    />
    <SettingsGridButton
    href='/comments'
    label='Comentarios'
    icon={<SolarChatLineLinear/>}
    />
    

  </Box>
}
