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

  const fetchChapter = async(fetchOptions?:RequestInit)=>{
      try{
        setError(null)
        setIsLoading(true)
        const data = await fetchCurrentChapter(fetchOptions)
        setData(data)
      } catch(e){
        if ((e as Error)?.name !== 'AbortError'){
        console.log('Error while fetching chapter ',e)
        setError(e as Error)
      }
      } finally {
        setIsLoading(false)
      }
    }

  useEffect(()=>{
    const abortController = new AbortController() 
    fetchChapter({
      signal:abortController.signal
    })
  
    return ()=>abortController.abort()

  },[currentChapter])
  return {
    data,
    isLoading,
    error,
    reloadChapter:fetchChapter,
    currentChapter
  } 
}
