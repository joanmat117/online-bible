import { db } from "@/db/dexie";
import { useLiveQuery } from "dexie-react-hooks";

interface Params {
  bookId?:string,
  chapter?:number
}

export function useVersesCommentsVerses({chapter,bookId}:Params={}){
  const versesComments = useLiveQuery(async()=>{
  try{
    if(bookId && chapter){
      return await db.versesComments
        .where({
          bookId,
          chapter
        })
        .toArray()


    }
    return await db.versesComments.toArray()
  } catch(e){
      console.log(e)
    }
  },[chapter,bookId])
  return versesComments
}
