"use client"
import { getBookById } from "@/shared/utils/booksUtilities"
import {Box,Typography} from '@mui/material'
import { useMemo } from "react"
import { SolarBookmarkOpenedLinear } from '@/shared/ui/Icons'
import { useVerseCommentaries } from '@/shared/hooks/useVerseCommentaries'
import { VerseCommentaryCard } from "./components/VerseCommentaryCard"

export function VerseCommentaries(){
  const versesComments = useVerseCommentaries()
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
      versesCommentsWithBookTitle.map(verse=><VerseCommentaryCard key={verse.id} verse={verse}/>) 
    }
  </>
}
