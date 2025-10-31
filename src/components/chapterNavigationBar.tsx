import { useBibleStore } from '@/zustand/useBibleStore'
import {Button, Stack} from '@mui/material'
import { ChapterSelector } from './chapterSelector'
import { SolarAltArrowLeftBold, SolarAltArrowRightBold } from './icons'

export function ChapterNavigationBar(){
  const changeToNextChapter = useBibleStore(state=>state.changeToNextChapter)
  const changeToPrevChapter = useBibleStore(state=>state.changeToPrevChapter)
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
