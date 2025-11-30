import {Suspense} from 'react'
import { ChapterReading } from '@/features/ChapterReading'
import {type Metadata} from 'next'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export async function generateMetadata({ searchParams}:Props):Promise<Metadata> {
  const {bookParam,chapterParam} = await searchParams
  const book:string = bookParam?.toString() || ''
  const chapter:string = chapterParam?.toString() || 'Biblia'

  const ogImageUrl = new URL('/api/og', process.env.NEXT_PUBLIC_BASE_URL)
  ogImageUrl.searchParams.set('book', book)
  ogImageUrl.searchParams.set('chapter', chapter)

  return {
    title:`Leer ${book} capitulo ${chapter}`,
    description:`${book} ${chapter} | Lee el capítulo completo de la Biblia.`,
    openGraph: {
      title: `Leer ${book} capitulo ${chapter}`,
      images: [ogImageUrl.toString()], 
    },
  }
}

export default function Read(){
 
  return <>
  <Suspense fallback={''}>
  <ChapterReading/>
  </Suspense>
	</>
}
