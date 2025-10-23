import { getBookById } from "@/utils/books-utilities"
import { useBibleStore } from "@/zustand/useBibleStore"
import { Button,Fade,Box, AccordionSummary, Typography, AccordionDetails, Accordion, Stack } from "@mui/material"
import { useState, useMemo, memo } from "react"
import books from '@/data/books.json'
import { ArrowLeft } from "lucide-react"


export function ChapterSelector(){
  const [isOpen,setIsOpen] = useState(false)
  const currentChapter = useBibleStore(state=>state.currentChapter)
  const changeChapter = useBibleStore(state=>state.changeChapter)
  
  const currentBook = useMemo(()=>{
    return getBookById(currentChapter.bookId)?.title
  },[currentChapter.bookId])
  
   const BooksList = useMemo(()=>{
    return <Fade in={true}>
    <Stack sx={{maxWidth:'md',mx:'auto',alignItems:'start',overflow:'auto',padding:2}}>
    <Button onClick={()=>setIsOpen(false)} variant="text" sx={{borderRadius:'100%',aspectRatio:'1/1',m:1,p:0}}><ArrowLeft/></Button>    
        {
          books.map((book,index)=>(
            <Accordion key={index} sx={{
              backgroundColor:(t)=>t.palette.background.paper,
              width:'100%',
              '&.Mui-expanded':{
                margin:0,
              }

            }}>
              <AccordionSummary > 
                <Typography>
                {book.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails onClick={()=>setIsOpen(false)}> 
              <Box sx={{display:'flex',flexWrap:'wrap',gap:1}}>
                {Array.from({length:book.numberOfChapters},(_,i)=>(
                  <Button onClick={()=>changeChapter({bookId:book.id,chapter:i+1})} key={i} size='small' variant='text' sx={{aspectRatio:'1/1',backgroundColor:(t)=>t.palette.background.default}} >{i+1} </Button>
                ))}
              </Box>
              </AccordionDetails>
            </Accordion>
          ))
        }
        </Stack>
        </Fade>

   },[books])

   

  return <>
  <Button onClick={()=>setIsOpen(true)} sx={{textTransform:'capitalize',borderRadius:'14px'}} variant='outlined'>
      {currentBook + ' ' + currentChapter.chapter}
  </Button>
  <Box sx={{display:isOpen?'block':'none',backgroundColor:'background.default',width:'100dvw',height:'100dvh',overflow:'auto',position:'fixed',top:0,left:0,zIndex:'30',bgcolor:'background.paper'}}>

  {BooksList}
  </Box>
  </>
}
