import verses from '@/data/verses.json'
import { RandomVerse } from '@/types/RandomVerse'
import { getBookById } from '@/utils/books-utilities'
import { useEffect, useMemo, useState } from 'react'

export function useRandomVerse(){
  const [randomVerse,setRandomVerse] = useState<RandomVerse|null>(null)
  const [copyState,setCopyState] = useState<-1|0|1>(0) 
  
  const verseRoute = useMemo(()=>{
    const verse = randomVerse
    if(!verse) return ''
    const verseNumber = verse.verse.length > 1? `${verse.verse[0]}-${verse.verse[verse.verse.length - 1]}`: `${verse.verse[0]}`
    return `${getBookById(verse.bookId)?.title} ${verse.chapter}:${verseNumber}`
  },[randomVerse])

  async function copyToClipboard() {
    if(!randomVerse) return
    const verseText = randomVerse.text
    const verseToCopy = `${verseText}\n ${verseRoute}`
    try {
        await navigator.clipboard.writeText(verseToCopy)
        setCopyState(1)
    } catch (err) {
        console.error('Error al copiar el texto: ', err);
        setCopyState(-1)
    } finally {
        setTimeout(() => {
          setCopyState(0)
        }, 2000)
    }
  }

  function reloadRandomVerse(){
    const randomIndex = Math.floor(Math.random() * verses.length)
    setRandomVerse(verses[randomIndex])
  }
  useEffect(()=>{
  reloadRandomVerse()    
  },[])
  return {randomVerse,reloadRandomVerse,verseRoute,copyToClipboard,copyState}
}
