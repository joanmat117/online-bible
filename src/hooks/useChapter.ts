"use client"

import { BibleChapterResponse } from "@/types/BibleChapterResponse"
import { useBibleStore } from "@/zustand/useBibleStore"
import { useEffect,useState } from "react"

export function useChapter(){
  const [data,setData] = useState<BibleChapterResponse|null>(null)
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [error,setError] = useState<Error|null>(null)
  const fetchCurrentChapter = useBibleStore(state=>state.fetchCurrentChapter)
  const currentChapter = useBibleStore(state=>state.currentChapter)

  useEffect(()=>{
    const fetchChapter = async()=>{
      try{
        setError(null)
        setIsLoading(true)
        const data = await fetchCurrentChapter()
        setData(data)
      } catch(e){
        console.log('Error while fetching chapter ',e)
        setError(e as Error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchChapter()
  },[currentChapter])
  return {
    data,
    isLoading,
    error,
    currentChapter
  } 
}
