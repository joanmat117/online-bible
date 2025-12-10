import { BibleChapterResponse } from "@/shared/types/BibleChapterResponse";

type BibleTranslations = 'spa_bes'|'spa_onbv'|'spa_pdt'|'spa_r09'|'spa_rvg'|'spa_v2p'|'spa_vbl'

interface Params {
  bookId:string,
  chapter:number,
  fetchOptions?:RequestInit,
  translation:BibleTranslations
}

export async function fetchBibleChapter({bookId = 'GEN',chapter = 1,fetchOptions={},translation}:Params):
Promise<BibleChapterResponse>{

  const res = await fetch(`https://bible.helloao.org/api/${translation}/${bookId}/${chapter}.json`,fetchOptions)

  const data = await res.json()

  return data

}
