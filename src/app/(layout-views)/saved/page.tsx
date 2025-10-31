"use client"
import { SavedVersesTable } from "@/db/dexie"
import { useSavedVerses } from "@/hooks/useSavedVerses"
import { getBookById } from "@/utils/books-utilities"
import {Box,Typography} from '@mui/material'
import { useMemo } from "react"

export default function Page(){
  const savedVerses = useSavedVerses()
  const savedVersesWithBookTitle = useMemo(()=>{
    if(!savedVerses) return
    return savedVerses.map(verse=>{
      const bookTitle = getBookById(verse.bookId.toString())?.title
      return {...verse,bookTitle}
    })
  },[savedVerses])
  return <>
    {savedVersesWithBookTitle?.map((verse)=>(
<Box sx={{
              borderRadius:'10px',
              position:'relative',
              border:'1px solid transparent',
              p:1
            }} key={verse.id}  
            >
            <Typography variant='subtitle1'>
              {verse.bookTitle + ' ' + verse.chapter + ':' + verse.number}
            </Typography>
            <Typography sx={{display:'inline',lineHeight:1.4,fontSize:20,fontFamily:'"Crimson Pro"'}} variant='body1' fontWeight={ 400}>
            {verse.content}
            </Typography>
          </Box>

    ))}
  </>
}
