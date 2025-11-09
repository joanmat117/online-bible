"use client"
import { getBookById } from "@/utils/books-utilities"
import {Box,Typography} from '@mui/material'
import { useMemo } from "react"
import { SolarBookmarkOpenedLinear } from './icons'
import { useVersesCommentsVerses } from '@/hooks/useVersesComments'
import { VerseCommentCard } from "./verseCommentCard"

export function RenderVersesComments(){
  const versesComments = useVersesCommentsVerses()
  const versesCommentsWithBookTitle = useMemo(()=>{
    if(!versesComments) return
    return versesComments.map(verse=>{
      const bookTitle = getBookById(verse.bookId.toString())?.title
      return {...verse,bookTitle}
    }) 
  },[versesComments])
  return <>
    {versesComments == undefined || versesComments.length == 0 &&
    <Box sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        gap:3,
        color:'text.secondary'
      }}>
        <SolarBookmarkOpenedLinear style={{width:54,height:54}}/>
      <Typography variant='h6' fontWeight={600}>
        No hay comentarios guardados
      </Typography>
    </Box>
    }
    { versesCommentsWithBookTitle&&
      versesCommentsWithBookTitle.map(verse=><VerseCommentCard key={verse.id} verse={verse}/>) 
    }
  </>
}
