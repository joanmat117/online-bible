import { db, type VerseCommentariesTable } from "@/shared/db/dexie";

export async function addVerseCommentaryToDB({bookId,comment,number,chapter,content}:Omit<VerseCommentariesTable,'id'>){
  try {
  await db.verseCommentaries.add({
    content,
    comment,
    chapter,
    number,
    bookId
  })
  } catch(e){
    console.log(e)
  }
}

export async function removeVerseCommentaryFromDB(id:number){
  try {
  await db.verseCommentaries.delete(id)
  } catch(e){
    console.log(e)
  }
}
 export async function updateVerseCommentaryFromDB({id,comment}:{id:number,comment:string}){
   try {
    await db.verseCommentaries.update(id,{
      comment
    })
   } catch(e){
     console.log(e)
   }
 }

