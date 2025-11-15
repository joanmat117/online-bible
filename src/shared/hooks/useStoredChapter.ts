"use client"
import { useState } from "react";
import { CurrentChapter } from "@/shared/contexts/useBibleStore";


export function useStoredChapter(){
  const [storedChapter,setStoredChapter] = useState<CurrentChapter|null>(()=>localStorage.getItem('currentChapter')? 
    JSON.parse(localStorage.getItem('currentChapter') as string):
    null
   )

   const changeStoredChapter = (chapter:CurrentChapter)=>{
    localStorage.setItem('currentChapter',JSON.stringify(chapter))
    setStoredChapter(chapter)
   }
  

  return {storedChapter,setStoredChapter:changeStoredChapter}
}
