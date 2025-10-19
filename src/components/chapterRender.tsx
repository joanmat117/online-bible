"use client"
import {useChapter} from '@/hooks/useChapter'
import { getBookById } from '@/utils/books-utilities';
import { useFetchChapterByParams } from '@/utils/useFetchChapterByParams';
import { Typography,Skeleton, Box, Stack } from '@mui/material'
import { useEffect } from 'react';

export const ChapterRender = () => {


  useFetchChapterByParams()
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
    <Box sx={{p:1}} component={'section'}>
    {
      isLoading && <Stack direction='column' sx={{height:'100vh',width:'100%',display:'flex',alignItems:'center',gap:3}} >
      <Skeleton variant='text' height='100px' width={'50%'} />
      <Skeleton variant='rounded' height='200px' width={'100%'} />
      <Skeleton variant='rounded' height='200px' width={'100%'} />
      <Skeleton variant='rounded' height='200px' width={'100%'} />
      </Stack>
    } 
    {
      !isLoading && error && <Box sx={{height:'100vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',gap:3}}>
        <Typography variant='h3'>
        Error {error.message}
        </Typography>
      </Box>
    }
    {
      data && verses && !error && !isLoading && <> 
      
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
      
      </>
    }
    
    </Box>
  );
};

