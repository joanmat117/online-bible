import { CurrentChapterStore, CurrentChapterWithoutTitle } from "@/shared/types/CurrentChapterStore";
import { getBookById, getNextChapter, getPrevChapter } from "@/shared/utils/booksUtilities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:{currentChapter:CurrentChapterStore} = {
    currentChapter: {
      bookId:'GEN',
      chapter:1,
      bookTitle:'Genesis',
      translation:'spa_r09'
    }
  }

const bibleSlice = createSlice({
  name:'bible',
  initialState,
  reducers:{
    changeChapter:(state,action:PayloadAction<CurrentChapterWithoutTitle>)=>{
      const prev = state.currentChapter
      const {bookId,chapter,translation} = action.payload 
      const book = getBookById(bookId)
      
      if(book == undefined) return
      if(book.numberOfChapters < chapter || chapter < 1) return
``
      state.currentChapter = {
          bookId,
          chapter,
          bookTitle:book.title,
          translation:translation || prev.translation 
        }
    },
    changeTranslation:(state,action:PayloadAction<CurrentChapterStore['translation']>)=>{
    const translation = action.payload
    state.currentChapter.translation = translation
    },
    changeToNextChapter:(state)=>{
      const {currentChapter} = state

      const nextChapter = getNextChapter(currentChapter)
      if(nextChapter == undefined) return
      state.currentChapter = {...state.currentChapter,...nextChapter}
    },
    changeToPrevChapter:(state)=>{
      const {currentChapter} = state

      const prevChapter = getPrevChapter(currentChapter)
      if(prevChapter == undefined) return
      state.currentChapter = {...state.currentChapter,...prevChapter}
    }
  }
})
export default bibleSlice.reducer
export const {changeChapter,changeToPrevChapter,changeToNextChapter,changeTranslation} = bibleSlice.actions


