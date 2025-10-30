import Dexie,{type EntityTable} from 'dexie';

interface SavedVersesTable {
  id:number,
  content:string,
  bookId:string,
  chapter:number,
  number:number
}

const db = new Dexie('bibleDatabase') as Dexie & {
  savedVerses:EntityTable<SavedVersesTable,'id'>
}

db.version(1).stores({
  savedVerses: '++id, text, bookId,chapter,number'  
});

export {db,type SavedVersesTable}
