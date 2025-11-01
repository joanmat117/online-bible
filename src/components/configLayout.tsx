"use client"
import {Box} from '@mui/material'
import {ButtonConfig} from '@/components/buttonConfig'
import { SolarMoonBold, SolarNotebookBookmarkBold } from './icons'
import {useTheme} from '@/components/themeContext'
import {useRouter} from 'next/navigation'

export function ConfigLayout(){
  const {toggleTheme,mode} = useTheme()
  const router = useRouter()
  return <Box sx={{
    display:'flex',
    flexWrap:'wrap',
    gap:2,
    p:2
  }}>
    <ButtonConfig
    icon={<SolarMoonBold/>}
    label='Modo Oscuro'
    onClick={()=>{
      toggleTheme()
    }}
    sx={{
      backgroundColor:mode == 'dark'? 'primary.main':undefined,
    }}
    >
    </ButtonConfig>
    <ButtonConfig
    icon={<SolarNotebookBookmarkBold/>}
    label='Versiculos Guardados'
    onClick={()=>{
      router.push('/saved')
    }}
    >
    </ButtonConfig>

  </Box>
}
