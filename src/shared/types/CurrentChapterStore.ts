import { BibleTranslationId } from "./BibleTranslations"

export type CurrentChapterStore = {
    bookId:string,
    chapter:number,
    bookTitle:string,
    translation:BibleTranslationId
}

export interface CurrentChapterWithoutTitle extends Omit<CurrentChapterStore,'bookTitle'>{
    translation?:BibleTranslationId
}
