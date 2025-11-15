import { useBibleStore } from "@/shared/contexts/useBibleStore";
import {useEffect, useMemo, useRef} from 'react'
import { getBookByQuery } from "@/shared/utils/booksUtilities";
import { useSearchParams} from "next/navigation"
import { useStoredChapter } from "@/shared/hooks/useStoredChapter";

export function useChapterManager(){
  const isMounting = useRef(true)
  const {storedChapter,setStoredChapter} = useStoredChapter() 
  const searchParams = useSearchParams()
  const changeChapter = useBibleStore(state=>state.changeChapter)
  const currentChapter = useBibleStore(state=>state.currentChapter)

  const chapterFromParams = useMemo(()=>{
    const chapterParam = Number(searchParams.get('chapter'))
    const bookParam = searchParams.get('book')
    if(!chapterParam || !bookParam) return;
    const book = getBookByQuery(bookParam)
    if(book == undefined || chapterParam > book.numberOfChapters || chapterParam < 1) return;
    return {
      chapter:chapterParam,
      bookId:book?.id,
    }
  },[])

  const updateUrlToCurrentChapter = ()=>{
    const newUrl = `/read?book=${currentChapter.bookTitle}&chapter=${currentChapter.chapter}`
    window.history.pushState({ ...window.history.state, url: newUrl }, '', newUrl)
  }
  const persistCurrentChapter = ()=>{
    setStoredChapter(currentChapter)
  }

  useEffect(()=>{
      if(chapterFromParams){
        changeChapter(chapterFromParams)
      } else if(storedChapter) {
        changeChapter(storedChapter)
      }
  },[])
  useEffect(()=>{
    if(isMounting.current){
      isMounting.current = false
      return
    }
    updateUrlToCurrentChapter()
    persistCurrentChapter()
  },[currentChapter])
    
}
