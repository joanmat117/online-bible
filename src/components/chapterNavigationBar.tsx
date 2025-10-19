import { getBookById } from '@/utils/books-utilities'
import { useBibleStore } from '@/zustand/useBibleStore'
import {Button, Stack} from '@mui/material'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ChapterNavigationBar(){
  const changeToNextChapter = useBibleStore(state=>state.changeToNextChapter)
  const changeToPrevChapter = useBibleStore(state=>state.changeToPrevChapter)
  const currentChapter = useBibleStore(state=>state.currentChapter)
  const [currentBook,setCurrentBook] = useState(()=>getBookById(currentChapter.bookId)?.title)
  useEffect(()=>{
    setCurrentBook(getBookById((currentChapter.bookId))?.title)
  },[currentChapter.bookId])
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
        <ArrowLeft/>
      </Button>
      <Button sx={{textTransform:'capitalize',borderRadius:'14px'}} variant='outlined'>
      {currentBook + ' ' + currentChapter.chapter}
      </Button>
      <Button 
      onClick={changeToNextChapter}
      sx={{borderRadius:'100px',maxWidth:'100px'}} fullWidth variant='text'>
        <ArrowRight/>
      </Button>
    </Stack>
  </>
}
