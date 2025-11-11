import { db } from "@/shared/db/dexie";
import { useLiveQuery } from "dexie-react-hooks";

interface Params {
  bookId?:string,
  chapter?:number
}

export function useVerseCommentaries({chapter,bookId}:Params={}){
  const versesComments = useLiveQuery(async()=>{
  try{
    if(bookId && chapter){
      return await db.verseCommentaries
        .where({
          bookId,
          chapter
        })
        .toArray()


    }
    return await db.verseCommentaries.toArray()
  } catch(e){
      console.log(e)
    }
  },[chapter,bookId])
  return versesComments
}
