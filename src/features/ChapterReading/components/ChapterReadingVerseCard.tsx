import { BibleVerse } from "../types/Verse"
import {Box,Typography} from '@mui/material'
import {convertToTextApiVerseContent} from '@/shared/utils/convertToTextApiVerseContent'
import { useColor } from "@/shared/hooks/useColor"
import { Dispatch, SetStateAction } from "react"
import { crimsonPro } from "@/shared/styles/fonts"

interface Props {
  verse:BibleVerse,
  setSelectedVerse:Dispatch<SetStateAction<BibleVerse | null>>

}

export function ChapterReadingVerseCard({verse,setSelectedVerse}:Props){
  const color = useColor(verse.number||0)
  return <>
  <Box id={verse.number?`${verse.number}`:undefined} sx={{
              borderRadius:'10px',
              position:'relative',
              cursor:'pointer',
              border:'1px solid transparent',
              p:1
            }} onClick={()=>verse.number && setSelectedVerse(verse)}
            >
            <Typography sx={{display:'inline',whiteSpace:'pre-wrap',lineHeight:1.4,fontSize:20,...crimsonPro.style}} variant='body1' fontWeight={verse.type == 'heading'? 700 : 400}>
            {verse.number && 
              <Typography sx={{
                backgroundColor:color.background,
                color:color.foreground,
                fontWeight:800
            }} variant='caption' px={1} borderRadius={'100px'} mx={1}>
                {verse.number}
              </Typography>
            } 
            {convertToTextApiVerseContent(verse.content)}
            </Typography>
          </Box>
  </>
}
