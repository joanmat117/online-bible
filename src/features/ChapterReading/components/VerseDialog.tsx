import { useCopyText } from "@/shared/hooks/useCopyText"
import { useSavedVerses } from "@/shared/hooks/useSavedVerses"
import { useVerseCommentaries } from "@/shared/hooks/useVerseCommentaries"
import { ChangeEvent, ReactNode, useMemo } from "react"
import { BibleVerse } from "../types/Verse"
import { addVerseCommentaryToDB, updateVerseCommentaryFromDB } from "@/shared/services/verseCommentariesApi"
import { convertToTextApiVerseContent } from "@/shared/utils/convertToTextApiVerseContent"
import { addSavedVerseToDB, removeSavedVerseFromDB } from "@/shared/services/savedVersesApi"
import { Dialog, DialogContent,Box, Typography, TextField, Button } from "@mui/material"
import { SolarBookmarkBold, SolarBookmarkLinear, SolarCheckCircleLinear, SolarCloseCircleLinear, SolarCopyLinear } from "@/shared/ui/Icons"
import { crimsonPro, lato } from "@/shared/styles/fonts"

interface Props {
  selectedVerse:BibleVerse|null,
  bookId:string,
  bookTitle:string|undefined,
  chapterNumber:number,
  setSelectedVerse:(newState:BibleVerse|null)=>void
}

export function VerseDialog({selectedVerse,bookId,bookTitle,chapterNumber,setSelectedVerse}:Props){

  const {copyText,copyState} = useCopyText()
  const chapterSavedVerses = useSavedVerses({bookId,chapter:chapterNumber})
  const chapterVersesComments = useVerseCommentaries({bookId,chapter:chapterNumber})
  const currentSavedVerse = useMemo(()=>{
    if(!selectedVerse) return undefined
    return chapterSavedVerses?.find((verse)=>verse.number==selectedVerse.number)
  },[selectedVerse,chapterSavedVerses])
   
  const currentVerseComment = useMemo(()=>{
    if(!selectedVerse) return undefined
    return chapterVersesComments?.find((verse)=>verse.number==selectedVerse.number)
  },[selectedVerse,chapterVersesComments]) 

  const onEditComment = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    if(!selectedVerse || !selectedVerse.number) return
    if(currentVerseComment){
      updateVerseCommentaryFromDB({
        id:currentVerseComment.id,
        comment:String(e.target.value)
      })
    } else {
      addVerseCommentaryToDB({
        comment:String(e.target.value),
        number:selectedVerse.number,
        content:convertToTextApiVerseContent(selectedVerse.content),
        bookId,
        chapter:chapterNumber
      })
    }
  }

  const toggleSave = ()=>{
    if(!selectedVerse || !selectedVerse.number) return
    if(currentSavedVerse){
      removeSavedVerseFromDB(currentSavedVerse.id)
    } else {
      addSavedVerseToDB({
        number:selectedVerse.number,
        bookId,
        chapter:chapterNumber,
        content:convertToTextApiVerseContent(selectedVerse.content)
      })
    }
  }

  return <Dialog open={Boolean(selectedVerse)} onClose={()=>setSelectedVerse(null)} >
      <DialogContent sx={{
        backgroundColor:'background.paper'
      }} >
        {selectedVerse !== null && <>
        <Typography fontWeight={700} textAlign={'center'} variant='body1' sx={{...lato.style}}>
            {`${bookTitle} ${chapterNumber}:${selectedVerse.number}`}
        </Typography>
        <Typography variant='body1' sx={{fontSize:19,...crimsonPro.style,my:2}}>
        {convertToTextApiVerseContent(selectedVerse.content)}
        </Typography>
        <Box sx={{
          display:'flex',
          flexWrap:'wrap',
          gap:1
        }}>
          <DialogButton onClick={()=>copyText(
            convertToTextApiVerseContent(selectedVerse.content)
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
        <Box sx={{py:2}}>
         <TextField
            variant='outlined'
            placeholder='Tu commentario'
            multiline
            onChange={onEditComment}
            label='Comentario'
            size='small'
            margin='dense'
            type='text'
            fullWidth
            defaultValue={currentVerseComment && currentVerseComment.comment}
          />
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
