import { getBookById } from "@/utils/books-utilities"
import { useBibleStore } from "@/zustand/useBibleStore"
import { Button,Fade,Box, AccordionSummary, Typography, AccordionDetails, Accordion, Stack, IconButton } from "@mui/material"
import { useState, useMemo} from "react"
import books from '@/data/books.json'
import { SolarAltArrowLeftBold } from "./icons"


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
          books.map((book,index)=>(
            <Accordion elevation={0} disableGutters key={index} sx={{
              backgroundColor:(t)=>t.palette.background.default,
              width:'100%',
              '&.Mui-expanded':{
                margin:0,
              }

            }}>
              <AccordionSummary onClick={(e)=>e.stopPropagation()}> 
                <Typography>
                {book.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails > 
              <Box sx={{display:'flex',flexWrap:'wrap',gap:1}}>
                {Array.from({length:book.numberOfChapters},(_,i)=>(
                  <Button onClick={()=>changeChapter({bookId:book.id,chapter:i+1})} key={i} color="inherit" size='medium' variant='text' sx={{
                    flex:1,
                    border:'1px solid',
                    borderColor:(t)=>t.palette.text.disabled,
                    paddingY:1,
                    backgroundColor:'background.paper'
                  }} >
                  {i+1} 
                  </Button>
                ))}
              </Box>
              </AccordionDetails>
            </Accordion>
          ))
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
