"use client"
import {useChapter} from '@/hooks/useChapter'
import { getBookById } from '@/utils/books-utilities';
import { useFetchChapterByParams } from '@/utils/useFetchChapterByParams';
import { useBibleStore } from '@/zustand/useBibleStore';
import { Typography,Button, Box, Stack } from '@mui/material'
import { useEffect } from 'react';

export const ChapterRender = () => {


  useFetchChapterByParams()
  const changeToPrevChapter = useBibleStore(state=>state.changeToPrevChapter)
  const changeToNextChapter = useBibleStore(state=>state.changeToNextChapter)
  const {currentChapter,data,error,isLoading} = useChapter()

  const verses = data?.chapter.content
  const chapterTitle = getBookById(currentChapter.bookId)?.title
  const chapterNumber = currentChapter.chapter

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:'instant'
    })
  },[currentChapter])

  return (
    <section>
    {
      isLoading && <>
      <Typography variant='h3'>
      Cargando {chapterTitle} {chapterNumber}
      </Typography>
      </>
    } 
    {
      !isLoading && error && <>
      Hubo un error
      </>
    }
    {
      data && verses && !error && !isLoading && <> 
      
      <Button fullWidth sx={{p:2,m:1,fontSize:20,borderRadius:'12px',textTransform:'capitalize'}} onClick={changeToPrevChapter} variant='contained'>
        Capitulo anterior
      </Button>
      <Typography py={3} textAlign={'center'} variant='h2'>
      {chapterTitle + ' ' + chapterNumber}
      </Typography>
      <Stack gap={1} direction='column' px={2}>
        {verses.map((verse) => (
          <Box key={verse.number}>
            <Typography sx={{display:'inline'}} variant='body1'>
            <Typography variant='caption' mx={1}>{verse.number}</Typography> 
            {verse.content.join(' ')}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Button fullWidth sx={{p:2,m:1,fontSize:20,borderRadius:'12px',textTransform:'capitalize'}} onClick={changeToNextChapter} variant='contained'>
       Capitulo siguiente
      </Button>
      </>
    }
    
    </section>
  );
};

