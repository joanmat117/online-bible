"use client"
import { usePathname } from 'next/navigation'
import { useBibleStore } from '@/shared/contexts/useBibleStore'
import {Button, Stack} from '@mui/material'
import { ChapterSelector } from './components/ChapterSelector'
import { SolarAltArrowLeftBold, SolarAltArrowRightBold } from '@/shared/ui/Icons'

export function ChapterNavigationBar(){
  const pathname = usePathname()
  const changeToNextChapter = useBibleStore(state=>state.changeToNextChapter)
  const changeToPrevChapter = useBibleStore(state=>state.changeToPrevChapter)
  if(pathname !== '/read') return 

    return <>
    <Stack direction={'row'} gap={2} sx={{
      width:'100vw',
      bgcolor:'background.paper',
      justifyContent:'center',
      p:1
    }}>
      <Button 
      onClick={changeToPrevChapter}
      sx={{borderRadius:'100px',maxWidth:'100px'}} fullWidth variant='text'>
        <SolarAltArrowLeftBold/>
      </Button>
      <ChapterSelector/>      
      <Button 
      onClick={changeToNextChapter}
      sx={{borderRadius:'100px',maxWidth:'100px'}} fullWidth variant='text'>
        <SolarAltArrowRightBold/>
      </Button>
    </Stack>
  </>
}
