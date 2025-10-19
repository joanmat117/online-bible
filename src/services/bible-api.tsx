import { BibleChapterResponse } from "@/types/BibleChapterResponse";

interface Params {
  bookId:string,
  chapter:number
}

export async function fetchBibleChapter({bookId = 'GEN',chapter = 1}:Params):Promise<BibleChapterResponse>{
  const translation = 'spa_onbv';

  const res = await fetch(`https://bible.helloao.org/api/${translation}/${bookId}/${chapter}.json`)

  const data = await res.json()

  return data

}
