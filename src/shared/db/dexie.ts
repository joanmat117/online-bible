import Dexie,{type EntityTable} from 'dexie';

interface SavedVersesTable {
  id:number,
  content:string,
  bookId:string,
  chapter:number,
  number:number
}

interface VerseCommentariesTable {
  id:number,
  content:string,
  comment:string,
  bookId:string,
  chapter:number,
  number:number
}

const db = new Dexie('bibleDatabase') as Dexie & {
  savedVerses:EntityTable<SavedVersesTable,'id'>,
  verseCommentaries:EntityTable<VerseCommentariesTable,'id'>
}

db.version(1).stores({
  savedVerses: '++id, content, bookId,chapter,number',
  verseCommentaries: '++id,content,comment,bookId,chapter,number' 
});

export {db,type SavedVersesTable,type VerseCommentariesTable}
