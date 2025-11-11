import { useBibleStore } from "@/shared/contexts/useBibleStore";
import { Accordion,AccordionDetails,AccordionSummary,Typography,Button,Box } from "@mui/material";
import { useRef } from "react";

interface Props {
  book:{
    id:string,
    numberOfChapters:number,
    title:string
  }
}

export function BookAccordion({book}:Props){
  const changeChapter = useBibleStore(store=>store.changeChapter)

  
  const onAccordionOpen = (e:HTMLElement|any)=>{
      e.stopPropagation()
        }

  return <Accordion  elevation={0} disableGutters sx={{
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

}
