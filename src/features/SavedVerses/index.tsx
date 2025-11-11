"use client"
import { useSavedVerses } from "@/shared/hooks/useSavedVerses"
import { getBookById } from "@/shared/utils/booksUtilities"
import {Box,Typography} from '@mui/material'
import { useMemo } from "react"

import { SolarBookmarkOpenedLinear } from '@/shared/ui/Icons'
import { SavedVerseCard } from "./components/SavedVerseCard"

export function SavedVerses(){
  const savedVerses = useSavedVerses()
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
      savedVersesWithBookTitle.map(verse=><SavedVerseCard key={verse.id} verse={verse} />)      
    }
  </>
}
