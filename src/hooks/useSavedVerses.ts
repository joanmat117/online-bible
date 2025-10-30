import { db } from "@/db/dexie";
import { useLiveQuery } from "dexie-react-hooks";

interface Params {
  bookId?:string,
  chapter?:number
}

export function useSavedVerses({chapter,bookId}:Params={}){
  const savedVerses = useLiveQuery(async()=>{
  try{
    if(bookId && chapter){
      return await db.savedVerses
        .where({
          bookId,
          chapter
        })
        .toArray()


    }
    return await db.savedVerses.toArray()
  } catch(e){
      console.log(e)
    }
  },[chapter,bookId])
  return savedVerses
}
