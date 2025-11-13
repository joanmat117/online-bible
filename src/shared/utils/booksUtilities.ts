import books from '@/shared/data/books.json'
import { formatStringForSearch } from '@/shared/utils/formatStringForSearch'

export function getBookById(id:string){
 return books.find((book)=>book.id == id.toUpperCase())
}

export function getPrevChapter({bookId,bookTitle,chapter}:{bookId:string,bookTitle:string,chapter:number}){
   const actualBookIndex = books.findIndex((book)=>book.id == bookId.toUpperCase())
   if(1 >= chapter){
     if(actualBookIndex == 0) return undefined
     const prevBook = books[actualBookIndex-1]
     return {
       bookId:prevBook.id,
       chapter:prevBook.numberOfChapters,
       bookTitle:prevBook.title
     }
   } else {
     return {
       bookId,
       chapter:chapter-1,
       bookTitle
     }
   }
}

export function getNextChapter({bookId,bookTitle,chapter}:{bookId:string,bookTitle:string,chapter:number}){
   const actualBookIndex = books.findIndex((book)=>book.id == bookId.toUpperCase())
   const actualBook = books[actualBookIndex]
   if(actualBook.numberOfChapters <= chapter){
     if(books.length-1 == actualBookIndex) return undefined
     const nextBook = books[actualBookIndex+1]
     return {
       bookId:nextBook.id,
       chapter:1,
       bookTitle:nextBook.title
     }
   } else {
     return {
       bookId,
       chapter:chapter+1,
       bookTitle
     }
   }
}

export function getBookByQuery(query:string){  
  const queryFormated = formatStringForSearch(query)
  return books.find((book)=>{
    const bookTitleFormated = formatStringForSearch(book.title)
    return bookTitleFormated == queryFormated
  })
}


