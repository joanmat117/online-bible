"use client"
import {useChapter} from '@/hooks/useChapter'
import { getBookById } from '@/utils/books-utilities';
import { useFetchChapterByParams } from '@/hooks/useFetchChapterByParams';
import { Typography,Fade,Skeleton, Box, Stack, Button, Dialog, DialogContent} from '@mui/material'
import { ReactNode, useEffect,useMemo,useState } from 'react';
import { WifiOff } from 'lucide-react';
import { SolarBookmarkBold, SolarBookmarkLinear, SolarCheckCircleLinear, SolarCloseCircleLinear, SolarCopyLinear} from './icons';
import { useCopyText } from '@/hooks/useCopyText';
import { useSavedVerses } from '@/hooks/useSavedVerses';
import { deleteVerseInDB, saveVerseInDB } from '@/services/dexie-api';
import {renderVerseContent} from '@/utils/renderVerseContent'
import versesColor from '@/data/versesColor.json'
import { useTheme} from '@/components/themeContext'

interface Verse {
    type: string;
    number?: number;
    content: Array<string | Record<string, any>>;
}

export const ChapterRender = () => {
  
  const [selectedVerse,setSelectedVerse] = useState<Verse|null>(null)
  useFetchChapterByParams()
  const {mode} = useTheme()
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
    <SelectVerseDialog chapterNumber={chapterNumber} bookTitle={bookTitle} selectedVerse={selectedVerse} bookId={bookId} setSelectedVerse={setSelectedVerse}/>
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
      <Button onClick={()=>reloadChapter} sx={{textTransform:'capitalize',color:'text.primary',borderColor:'error.main'}} variant='outlined'>
      Reintentar
      </Button>
      </Box>
    }
    <Fade in={Boolean(data && verses != undefined && !error && !isLoading)}> 
      <Stack gap={0.5} direction='column' px={1}>
        {verses?.map((verse,index) => {
          const color = versesColor[index % versesColor.length]
          const foregroundColor = mode == 'dark'? 
            color.foregroundLight:
            color.foregroundDark

          return (
          <Box id={verse.number?`${verse.number}`:undefined} sx={{
              borderRadius:'10px',
              position:'relative',
              border:'1px solid transparent',
              p:1
            }} key={index}  onClick={()=>verse.number && setSelectedVerse(verse)}
            >
            <Typography sx={{display:'inline',lineHeight:1.4,fontSize:20,fontFamily:'"Crimson Pro"'}} variant='body1' fontWeight={verse.type == 'heading'? 700 : 400}>
            {verse.number && 
              <Typography sx={{
                backgroundColor:color.background,
                color:foregroundColor,
                fontWeight:800
            }} variant='caption' px={1} borderRadius={'100px'} mx={1}>
                {verse.number}
              </Typography>
            } 
            {renderVerseContent(verse.content)}
            </Typography>
          </Box>
        )})}
      </Stack>
      
      </Fade>
    
    </Box>
    </>
  );
};

interface DialogParams {
  selectedVerse:Verse|null,
  bookId:string,
  bookTitle:string|undefined,
  chapterNumber:number,
  setSelectedVerse:(newState:Verse|null)=>void
}

function SelectVerseDialog({selectedVerse,bookId,bookTitle,chapterNumber,setSelectedVerse}:DialogParams){

  const {copyText,copyState} = useCopyText()
  const chapterSavedVerses = useSavedVerses({bookId,chapter:chapterNumber})
  const currentSavedVerse = useMemo(()=>{
    if(!selectedVerse) return undefined
    return chapterSavedVerses?.find((verse)=>verse.number==selectedVerse.number)
  },[selectedVerse,chapterSavedVerses])
  

  const toggleSave = ()=>{
    if(!selectedVerse || !selectedVerse.number) return
    if(currentSavedVerse){
      deleteVerseInDB(currentSavedVerse.id)
    } else {
      saveVerseInDB({
        number:selectedVerse.number,
        bookId,
        chapter:chapterNumber,
        content:renderVerseContent(selectedVerse.content)
      })
    }
  }

  return <Dialog open={Boolean(selectedVerse)} onClose={()=>setSelectedVerse(null)} >
      <DialogContent sx={{
        backgroundColor:'background.paper'
      }} >
        {selectedVerse !== null && <>
        <Typography fontWeight={700} textAlign={'center'} variant='body1' sx={{fontFamily:'"Lato"'}}>
            {`${bookTitle} ${chapterNumber}:${selectedVerse.number}`}
        </Typography>
        <Typography variant='body1' sx={{fontSize:19,fontFamily:'"crimson Pro"',my:2}}>
        {renderVerseContent(selectedVerse.content)}
        </Typography>
        <Box sx={{
          display:'flex',
          flexWrap:'wrap',
          gap:1
        }}>
          <DialogButton onClick={()=>copyText(
            renderVerseContent(selectedVerse.content)
          )}>
              {copyState === -1 && <SolarCloseCircleLinear/>}
              {copyState === 0 && <SolarCopyLinear/>}
              {copyState === 1 && <SolarCheckCircleLinear/>}
          </DialogButton>

          <DialogButton onClick={()=>toggleSave()}>
            {currentSavedVerse?
            <SolarBookmarkBold/>:
            <SolarBookmarkLinear/>
            }  
          </DialogButton>
        </Box>
        </>}
      </DialogContent>
  </Dialog> 
}

function DialogButton({children,onClick}:{children?:ReactNode,onClick?:()=>void}){
  return <Button variant='outlined'  onClick={onClick} sx={{
      flex:1,
      minWidth:'100px',
      borderRadius:'10px'
    }}>
  {children}
  </Button>

}
