"use client"
import {Box} from '@mui/material'
import { SolarChatLineBold, SolarChatLineLinear, SolarMoonBold, SolarNotebookBookmarkBold } from '@/shared/ui/Icons'
import {useMuiTheme} from '@/shared/contexts/MuiThemeContext'
import { SettingAndSectionButton} from './components/SettingAndSectionButton'

export function SettingsAndSections(){
  const {toggleTheme,mode} = useMuiTheme()
  return <Box sx={{
    display:'flex',
    flexWrap:'wrap',
    gap:2,
    p:2
  }}>
    <SettingAndSectionButton
    icon={<SolarMoonBold/>}
    label='Modo Oscuro'
    onClick={()=>{
      toggleTheme()
    }}
    sx={{
      backgroundColor:mode == 'dark'? 'primary.main':undefined,
    }}
    >
    </SettingAndSectionButton>
    <SettingAndSectionButton
    icon={<SolarNotebookBookmarkBold/>}
    label='Versiculos Guardados'
    href='/saved'    
    />
    <SettingAndSectionButton
    href='/comments'
    label='Comentarios'
    icon={<SolarChatLineBold/>}
    />
    

  </Box>
}
