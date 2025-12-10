import { BibleTranslationId } from "./BibleTranslations"

export type CurrentChapterStore = {
    bookId:string,
    chapter:number,
    bookTitle:string,
    translation:BibleTranslationId
}

export type CurrentChapterWithoutTitle = Omit<CurrentChapterStore, 'bookTitle'> & {
  translation?: BibleTranslationId
}
