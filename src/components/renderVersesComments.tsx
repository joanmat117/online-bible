"use client"
import { IconButton, Stack } from '@mui/material'
import { getBookById } from "@/utils/books-utilities"
import {Box,Typography} from '@mui/material'
import { useMemo } from "react"
import { X } from 'lucide-react'
import versesColor from '@/data/versesColor.json'
import {useTheme} from '@/components/themeContext'
import { SolarBookmarkOpenedLinear } from './icons'
import { useVersesCommentsVerses } from '@/hooks/useVersesComments'
import { removeVerseCommentFromDB } from '@/services/versesCommentsApi'

export function RenderVersesComments(){
  const versesComments = useVersesCommentsVerses()
  const {mode} = useTheme()
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
      <Stack px={1} py={2} gap={2}>
      {versesCommentsWithBookTitle.map((verse)=>{
        if(!verse.comment) return
        const color = versesColor[verse.id % versesColor.length]
        const foregroundColor = mode == 'dark'? 
          color.foregroundLight:
          color.foregroundDark
        return (
        <Box key={verse.id} sx={{
          display:'flex',
          flexDirection:'column',
          backgroundColor:'background.paper',
          borderRadius:'15px',
          overflow:'hidden'
        }}>
        <Stack direction='row' sx={{
          justifyContent:'space-between',
          alignItems:'center',
          px:2,
          backgroundColor:color.background
        }}>
          <Typography variant='subtitle1' fontWeight={700} sx={{color:foregroundColor}}>
            {verse.bookTitle + ' ' + verse.chapter + ':' + verse.number}
          </Typography>
          
          <IconButton onClick={()=>removeVerseCommentFromDB(verse.id)} sx={{color:foregroundColor}}>
            <X/>
          </IconButton>
        </Stack>
              <Typography p={1.3} color='textSecondary' sx={{display:'inline',backgroundColor:'background.default',lineHeight:1.3,fontSize:17,fontFamily:'"Crimson Pro"'}} variant='body1' fontWeight={ 400}>
              {verse.content}
              </Typography>
              <Typography p={1.4} sx={{display:'inline',whiteSpace:'pre-wrap',lineHeight:1.4,fontSize:18}} variant='body1' fontWeight={ 400}>
              {verse.comment}
              </Typography>
        </Box>
      )})}
    </Stack>
    }
  </>
}
