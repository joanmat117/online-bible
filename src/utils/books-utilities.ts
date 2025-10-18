import books from '@/data/books.json'
import { formatStringToSearch } from './formatStringToSearch'

export function getBookById(id:string){
 return books.find((book)=>book.id == id.toUpperCase())
}

export function getPrevChapter({bookId,chapter}:{bookId:string,chapter:number}){
   const actualBookIndex = books.findIndex((book)=>book.id == bookId.toUpperCase())
   if(1 >= chapter){
     if(actualBookIndex == 0) return undefined
     const prevBook = books[actualBookIndex-1]
     return {
       bookId:prevBook.id,
       chapter:prevBook.numberOfChapters
     }
   } else {
     return {
       bookId,
       chapter:chapter-1
     }
   }
}

export function getNextChapter({bookId,chapter}:{bookId:string,chapter:number}){
   const actualBookIndex = books.findIndex((book)=>book.id == bookId.toUpperCase())
   const actualBook = books[actualBookIndex]
   if(actualBook.numberOfChapters <= chapter){
     if(books.length-1 == actualBookIndex) return undefined
     const nextBook = books[actualBookIndex+1]
     return {
       bookId:nextBook.id,
       chapter:1
     }
   } else {
     return {
       bookId,
       chapter:chapter+1
     }
   }
}

export function getBookByQuery(query:string){  
  const queryFormated = formatStringToSearch(query)
  return books.find((book)=>{
    const bookTitleFormated = formatStringToSearch(book.title)
    return bookTitleFormated == queryFormated
  })
}


