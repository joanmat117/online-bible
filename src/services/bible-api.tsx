interface Params {
  bookId:string,
  chapter:number
}

export async function fetchBibleChapter({bookId = 'GEN',chapter = 1}:Params){
  const translation = 'spa_r09';

  const res = await fetch(`https://bible.helloao.org/api/${translation}/${bookId}/${chapter}.json`)

  const data = await res.json()

  return data

}
