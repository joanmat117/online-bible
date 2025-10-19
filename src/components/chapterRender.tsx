"use client"
import {useChapter} from '@/hooks/useChapter'
import { getBookById } from '@/utils/books-utilities';
import { useFetchChapterByParams } from '@/hooks/useFetchChapterByParams';
import { Typography,Skeleton, Box, Stack, ButtonBase } from '@mui/material'
import { useEffect } from 'react';

const renderVerseContent = (content:Array<string|Record<string,any>>) => {
    if (!content) return '';
    
    return content.map((item) => {
      if (typeof item === 'string') {
        return item;
      } else if (item.lineBreak) {
        return '\n'; // o puedes usar <br /> si prefieres
      }
      return ''; // caso por defecto para otros tipos de objetos
    }).join(' ');
  }

export const ChapterRender = () => {

  useFetchChapterByParams()
  const {currentChapter,data,error,isLoading} = useChapter()

  const verses = data?.chapter.content
  const chapterTitle = getBookById(currentChapter.bookId)?.title
  const chapterNumber = currentChapter.chapter

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  },[currentChapter])

  return (
    <Box sx={{p:1,mb:3}} component={'section'}>
    {
      isLoading && !data && <Stack direction='column' sx={{height:'100vh',width:'100%',display:'flex',alignItems:'center',gap:3}} >
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
      data && verses && !error && <> 
      <Stack py={3} direction='column' gap={1} sx={{alignItems:'center'}}>
      <Typography variant='h6' color='textSecondary'>{chapterTitle}</Typography>
      <Typography variant='h2' fontWeight={800}>{chapterNumber}</Typography>
      </Stack>
      <Stack gap={1} direction='column' px={1}>
        {verses.map((verse,index) => (
          <ButtonBase sx={{textAlign:'left',justifyContent:'left',borderRadius:'10px',p:1}} key={index}>
            <Typography sx={{display:'inline',lineHeight:1,fontSize:18}} variant='body1' fontWeight={verse.type == 'heading'? 700 : 400}>
            {verse.number && <Typography sx={{fontStyle:'italic'}} variant='caption' mx={1}>{verse.number}</Typography>} 
            {renderVerseContent(verse.content)}
            </Typography>
          </ButtonBase>
        ))}
      </Stack>
      
      </>
    }
    
    </Box>
  );
};

