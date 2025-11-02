import { BibleChapterResponse } from "@/types/BibleChapterResponse";

interface Params {
  bookId:string,
  chapter:number,
  fetchOptions?:RequestInit
}

export async function fetchBibleChapter({bookId = 'GEN',chapter = 1,fetchOptions={}}:Params):
Promise<BibleChapterResponse>{
  const translation = 'spa_r09';//onbv,r09,v2p,vbl

  const res = await fetch(`https://bible.helloao.org/api/${translation}/${bookId}/${chapter}.json`,fetchOptions)

  const data = await res.json()

  return data

}
