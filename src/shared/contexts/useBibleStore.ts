import { fetchBibleChapter } from '@/shared/services/bibleApi'
import { BibleChapterResponse } from '@/shared/types/BibleChapterResponse'
import { getBookById, getNextChapter,getPrevChapter } from '@/shared/utils/booksUtilities'
import {create} from 'zustand'

interface BibleStore {
  currentChapter:{
    bookId:string,
    chapter:number
  },
  changeChapter:({bookId,chapter}:{
    bookId:string,
    chapter:number
  })=>void,
  fetchCurrentChapter: (fetchOptions?:RequestInit)=>Promise<BibleChapterResponse>,
  changeToNextChapter: ()=>void,
  changeToPrevChapter: ()=>void
}

export const useBibleStore = create<BibleStore>((set,get)=>{
  return {
    currentChapter: {
      bookId:'GEN',
      chapter:1
    },
    changeChapter:({bookId,chapter})=>{
      
      const book = getBookById(bookId)
      
      if(book == undefined) return
      if(book.numberOfChapters < chapter || chapter < 1) return

      set({
        currentChapter:{
          bookId,
          chapter
        }
      })
    },
    fetchCurrentChapter:async(fetchOptions)=>{
      
        const {currentChapter} = get()

        const data = await fetchBibleChapter({
          bookId:currentChapter.bookId,
          chapter:currentChapter.chapter,
          fetchOptions
        })

        return data
      
    },
    changeToNextChapter:()=>{
      const {currentChapter} = get()

      const nextChapter = getNextChapter(currentChapter)
      if(nextChapter == undefined) return
      set({
        currentChapter:nextChapter
      })
    },
    changeToPrevChapter:()=>{
      const {currentChapter} = get()

      const prevChapter = getPrevChapter(currentChapter)
      if(prevChapter == undefined) return
      set({
        currentChapter:prevChapter
      })
    }
  }
})
