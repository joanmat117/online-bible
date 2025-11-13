import { useBibleStore } from "@/shared/contexts/useBibleStore";
import { Accordion,AccordionDetails,AccordionSummary,Typography,Button,Box } from "@mui/material";
import { RefObject, useRef } from "react";

interface Props {
  book:{
    id:string,
    numberOfChapters:number,
    title:string
  },
  menuRef:RefObject<HTMLElement|null>
}

export function BookAccordion({book,menuRef}:Props){
  const changeChapter = useBibleStore(store=>store.changeChapter)
  const accordionRef = useRef<HTMLDivElement|null>(null)
  
  const onAccordionOpen = (e:HTMLElement|any)=>{
    e.stopPropagation()
    if(!menuRef.current || !accordionRef.current) return
      accordionRef.current.lookupPrefix
    const distance = accordionRef.current.offsetTop
    menuRef.current.scrollTo({
      top:distance - 50,
      behavior:'smooth'
    })

  }

  return <Accordion ref={accordionRef}  elevation={0} disableGutters sx={{
              backgroundColor:(t)=>t.palette.background.default,
              width:'100%',
              '&.Mui-expanded':{
                margin:0,
              }

            }}>
              <AccordionSummary onClick={onAccordionOpen}> 
                <Typography>
                {book.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails > 
              <Box sx={{display:'flex',flexWrap:'wrap',gap:1}}>
                {Array.from({length:book.numberOfChapters},(_,i)=>(
                  <Button onClick={()=>changeChapter({bookId:book.id,chapter:i+1})} key={i} color="inherit" size='medium' variant='text' sx={{
                    flex:1,
                    fontWeight:700,
                    paddingY:1,
                    backgroundColor:'background.paper'
                  }} >
                  {i+1} 
                  </Button>
                ))}
              </Box>
              </AccordionDetails>
            </Accordion>

}
