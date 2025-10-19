import { useBibleStore } from "@/zustand/useBibleStore";
import {useEffect} from 'react'
import { getBookByQuery } from "@/utils/books-utilities";
import { useSearchParams } from "next/navigation"

export function useFetchChapterByParams(){
  
  const searchParams = useSearchParams()
  const changeChapter = useBibleStore(state=>state.changeChapter)
  

  useEffect(()=>{

    const chapterParam = Number(searchParams.get('chapter'))
    const bookParam = searchParams.get('book')
    
    if(!chapterParam || !bookParam) return;

    const book = getBookByQuery(bookParam)
    if(book == undefined || chapterParam > book.numberOfChapters || chapterParam < 1) return;
    
    
    changeChapter({
      chapter:chapterParam,
      bookId:book?.id
    })


  },[])
    
}
