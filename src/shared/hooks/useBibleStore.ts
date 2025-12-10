import { useSelector,useDispatch } from "react-redux"
import { StoreDispatch, StoreState } from "@/shared/contexts/store"
import { changeChapter as changeCh, changeToNextChapter, changeToPrevChapter,changeTranslation as changeTr} from "@/shared/contexts/storeSlices/bibleSlice"
import { fetchBibleChapter } from "@/shared/services/bibleApi"
import { BibleChapterResponse } from "@/shared/types/BibleChapterResponse"
import { CurrentChapterStore, CurrentChapterWithoutTitle } from "../types/CurrentChapterStore"


export function useBibleStore(){
  const {currentChapter} = useSelector((state:StoreState)=>state.bible) 
  const dispatch:StoreDispatch = useDispatch()

  const changeChapter = (chapter:CurrentChapterWithoutTitle)=>{
    dispatch(changeCh(chapter))
  }

  const changeTranslation = (translation:CurrentChapterStore['translation'])=>{
    dispatch(changeTr(translation))
  }

  const nextChapter = ()=>{
    dispatch(changeToNextChapter())
  }
  const prevChapter = ()=>{
    dispatch(changeToPrevChapter())
  }
  const fetchCurrentChapter = async (fetchOptions?:RequestInit):Promise<BibleChapterResponse>=>{
    const {chapter,bookId,translation} = currentChapter
    const data = await fetchBibleChapter({chapter,bookId,fetchOptions,translation})

    return data
  }

  return {
    currentChapter,
    changeChapter,
    changeToNextChapter:nextChapter,
    changeToPrevChapter:prevChapter,
    fetchCurrentChapter,
    changeTranslation
  }
}
