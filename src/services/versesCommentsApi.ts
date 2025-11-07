import { db, type VersesCommentTable } from "@/db/dexie";

export async function addVerseCommentToDB({bookId,comment,number,chapter,content}:Omit<VersesCommentTable,'id'>){
  try {
  await db.versesComments.add({
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

export async function removeVerseCommentFromDB(id:number){
  try {
  await db.versesComments.delete(id)
  } catch(e){
    console.log(e)
  }
}
 export async function updateVerseCommentFromDB({id,comment}:{id:number,comment:string}){
   try {
    await db.versesComments.update(id,{
      comment
    })
   } catch(e){
     console.log(e)
   }
 }

