export async function fetchBibleChapter(){
  const translation = 'spa_r09';
  const book = '2PE';
  const chapter = 2;

  const res = await fetch(`https://bible.helloao.org/api/${translation}/${book}/${chapter}.json`)

  const data = await res.json()

fetch(`https://bible.helloao.org/api/${translation}/books.json`)
    .then(request => request.json())
    .then(books => {
        console.log(`The ${translation} has the following books:`, books);
    });

  return data

}
