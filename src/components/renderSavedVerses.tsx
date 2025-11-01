"use client"
import { IconButton, Stack } from '@mui/material'
import { useSavedVerses } from "@/hooks/useSavedVerses"
import { getBookById } from "@/utils/books-utilities"
import {Box,Typography} from '@mui/material'
import { useMemo } from "react"
import { X } from 'lucide-react'
import versesColor from '@/data/versesColor.json'
import {useTheme} from '@/components/themeContext'
import { deleteVerseInDB } from '@/services/dexie-api'
import { SolarBookmarkOpenedLinear } from './icons'

export function RenderSavedVerses(){
  const savedVerses = useSavedVerses()
  const {mode} = useTheme()
  const savedVersesWithBookTitle = useMemo(()=>{
    if(!savedVerses) return
    return savedVerses.map(verse=>{
      const bookTitle = getBookById(verse.bookId.toString())?.title
      return {...verse,bookTitle}
    }) 
  },[savedVerses])
  return <>
    {savedVerses == undefined || savedVerses.length == 0 &&
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
        No hay versiculos guardados
      </Typography>
    </Box>
    }
    { savedVersesWithBookTitle &&
      <Stack px={1} py={2} gap={2}>
      {savedVersesWithBookTitle.map((verse)=>{
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
          
          <IconButton onClick={()=>deleteVerseInDB(verse.id)} sx={{color:foregroundColor}}>
            <X/>
          </IconButton>
        </Stack>
              <Typography p={1.4} sx={{display:'inline',lineHeight:1.4,fontSize:20,fontFamily:'"Crimson Pro"'}} variant='body1' fontWeight={ 400}>
              {verse.content}
              </Typography>
        </Box>
      )})}
    </Stack>
    }
  </>
}
