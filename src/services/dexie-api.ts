import { db, SavedVersesTable } from "@/db/dexie";

export async function saveVerseInDB({bookId,number,chapter,content}:Omit<SavedVersesTable,'id'>){
  try {
  await db.savedVerses.add({
    content,
    chapter,
    number,
    bookId
  })
  } catch(e){
    console.log(e)
  }
}

export async function deleteVerseInDB(id:number){
  try {
  await db.savedVerses.delete(id)
  } catch(e){
    console.log(e)
  }
}


