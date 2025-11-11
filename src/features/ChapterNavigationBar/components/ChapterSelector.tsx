import { getBookById } from "@/shared/utils/booksUtilities"
import { useBibleStore } from "@/shared/contexts/useBibleStore"
import { Button,Fade,Box, AccordionSummary, Typography, AccordionDetails, Accordion, Stack, IconButton } from "@mui/material"
import { useState, useMemo} from "react"
import books from '@/shared/data/books.json'
import { SolarAltArrowLeftBold } from "@/shared/ui/Icons"
import { BookAccordion } from "./BookAccordion"


export function ChapterSelector(){
  const [isOpen,setIsOpen] = useState(false)
  const currentChapter = useBibleStore(state=>state.currentChapter)
  const changeChapter = useBibleStore(state=>state.changeChapter)

  
  
  const currentBook = useMemo(()=>{
    return getBookById(currentChapter.bookId)?.title
  },[currentChapter.bookId])
  
   const BooksList = useMemo(()=>{
    return <Box onClick={()=>setIsOpen(false)} sx={{
      backgroundColor:'background.default',
      width:'100dvw',
      height:'100dvh',
      overflow:'auto',
      position:'fixed',
      top:0,
      left:0,
      zIndex:'30'
    }}>
    <Stack sx={{
        maxWidth:'md',
        mx:'auto',
        alignItems:'start',
        overflow:'auto',
        padding:2
      }}>
    <IconButton color="inherit" onClick={()=>setIsOpen(false)} sx={{
      borderRadius:'100%',
      m:1
    }}>
      <SolarAltArrowLeftBold/>
    </IconButton>    
        {
          books.map((book,index)=><BookAccordion book={book} key={index} />)
        }
        </Stack>
      </Box>

   },[books])

   

  return <>
  <Button onClick={()=>setIsOpen(true)} sx={{textTransform:'capitalize',borderRadius:'8px'}} variant='contained' disableElevation>
      {currentBook + ' ' + currentChapter.chapter}
  </Button>
  <Fade in={isOpen} timeout={300}>
    {BooksList}
  </Fade>
  </>
}
