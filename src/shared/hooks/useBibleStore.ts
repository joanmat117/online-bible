import { useSelector,useDispatch } from "react-redux"
import { StoreDispatch, StoreState } from "@/shared/contexts/store"
import { changeChapter, changeToNextChapter, changeToPrevChapter } from "@/shared/contexts/storeSlices/bibleSlice"
import { fetchBibleChapter } from "@/shared/services/bibleApi"
import { BibleChapterResponse } from "@/shared/types/BibleChapterResponse"


export function useBibleStore(){
  const {currentChapter} = useSelector((state:StoreState)=>state.bible) 
  const dispatch:StoreDispatch = useDispatch()

  const change = (chapter:{bookId:string,chapter:number})=>{
    dispatch(changeChapter(chapter))
  }

  const nextChapter = ()=>{
    dispatch(changeToNextChapter())
  }
  const prevChapter = ()=>{
    dispatch(changeToPrevChapter())
  }
  const fetchCurrentChapter = async (fetchOptions?:RequestInit):Promise<BibleChapterResponse>=>{
    const {chapter,bookId} = currentChapter
    const data = await fetchBibleChapter({chapter,bookId,fetchOptions})

    return data
  }

  return {
    currentChapter,
    changeChapter:change,
    changeToNextChapter:nextChapter,
    changeToPrevChapter:prevChapter,
    fetchCurrentChapter
  }
}
