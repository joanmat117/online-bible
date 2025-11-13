"use client"
import {useChapter} from './hooks/useChapter'
import { getBookById } from '@/shared/utils/booksUtilities';
import { useManageUrl } from './hooks/useManageUrl';
import { Typography,Fade,Skeleton, Box, Stack, Button} from '@mui/material'
import { useEffect,useState } from 'react';
import { WifiOff } from 'lucide-react';
import { BibleVerse } from './types/Verse';
import { ChapterReadingVerseCard } from './components/ChapterReadingVerseCard';
import { VerseDialog } from './components/VerseDialog';

export const ChapterReading = () => {
  
  useManageUrl()
  const [selectedVerse,setSelectedVerse] = useState<BibleVerse|null>(null)
  const {currentChapter,data,error,isLoading,reloadChapter} = useChapter()
  const verses = data?.chapter.content
  const bookId = currentChapter.bookId
  const bookTitle = getBookById(currentChapter.bookId)?.title
  const chapterNumber = currentChapter.chapter

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  },[currentChapter])

  return (
    <>
    <VerseDialog chapterNumber={chapterNumber} bookTitle={bookTitle} selectedVerse={selectedVerse} bookId={bookId} setSelectedVerse={setSelectedVerse}/>
    <Box sx={{p:1,mb:3,flex:1,display:'flex',flexDirection:'column',width:'100%'}} component={'section'}>
      <Stack py={3} direction='column' gap={1} sx={{alignItems:'center'}}>
      <Typography variant='h6' sx={{fontFamily:'Crimson Pro'}} color='textSecondary' >{bookTitle}</Typography>
      <Typography variant='h1' component={'p'} fontWeight={800} sx={{fontFamily:'"Crimson Pro"'}}>{chapterNumber}</Typography>
      </Stack>
    {
      isLoading && !data && <Stack direction='column' sx={{height:'100vh',width:'100%',display:'flex',alignItems:'center',gap:3}} >
      <Skeleton variant='rounded' height='150px' width={'100%'} />
      <Skeleton variant='rounded' height='150px' width={'100%'} />
      <Skeleton variant='rounded' height='150px' width={'100%'} />
      </Stack>
    } 
    {
      !isLoading && error && <Box sx={{flex:1,width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:3}}>
      <WifiOff width={54} height={54} />  
      <Typography variant='h6'>
         Error, compruebe su conexion a Internet
      </Typography>
      <Button onClick={()=>reloadChapter} sx={{textTransform:'capitalize',color:'text.primary'}} variant='outlined'>
      Reintentar
      </Button>
      </Box>
    }
    <Fade in={Boolean(data && verses != undefined && !error && !isLoading)}> 
      <Stack gap={0.5} direction='column' px={1}>
        {verses?.map((verse,index) => <ChapterReadingVerseCard key={index} setSelectedVerse={setSelectedVerse} verse={verse} />)}
      </Stack>
      
      </Fade>
    
    </Box>
    </>
  );
};


