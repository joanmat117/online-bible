import {Suspense} from 'react'
import { ChapterReading } from '@/features/ChapterReading'
import {type Metadata} from 'next'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { bookParam, chapterParam } = await searchParams
  const book: string = bookParam?.toString() || ''
  const chapter: string = chapterParam?.toString() || ''

  const hasBookAndChapter = book && chapter
  
  const searchParamsString = new URLSearchParams({
    book,
    chapter
  }).toString()

  const ogImageUrl = `/api/og?${searchParamsString}`
  const canonicalUrl = hasBookAndChapter 
    ? `/read?book=${book}&chapter=${chapter}`
    : '/read'

  // Títulos y descripciones
  const pageTitle = hasBookAndChapter 
    ? `Leer ${book} capitulo ${chapter} - Online Bible` 
    : 'Leer la Biblia - Online Bible'

  const pageDescription = hasBookAndChapter 
    ? `${book} ${chapter} | Lee el capítulo completo de la Biblia.` 
    : 'Lee el capitulo de la Biblia que desees'

  const ogDescription = hasBookAndChapter 
    ? `Lee ${book} capítulo ${chapter} completo en nuestra Biblia Online. Palabra de Dios para tu vida.` 
    : 'Biblia Online Completa - Encuentra paz y sabiduría en la Palabra de Dios.'

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: hasBookAndChapter 
      ? [book, chapter, 'Biblia', 'capítulo bíblico', 'Online Bible']
      : ['Biblia online', 'Leer Biblia', 'Online Bible', 'Sagradas Escrituras'],
    
    // Open Graph Meta Tags
    openGraph: {
      title: pageTitle,
      description: ogDescription,
      images: [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: hasBookAndChapter ? `${book} ${chapter}` : 'Biblia Online'
      }],
      url: canonicalUrl,
      type: 'website',
      siteName: 'Online Bible',
      locale: 'es_ES',
    },

    // Twitter Card Meta Tags
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: ogDescription,
      images: [ogImageUrl],
    },

    // Additional Meta Tags
    authors: [{ name: 'Online Bible' }],
    creator: 'Online Bible',
    publisher: 'Online Bible',
    
    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },

    // Metadata Base
    metadataBase: new URL('https://online-bible.vercel.app'),
  }
}
export default function Read(){
 
  return <>
  <Suspense fallback={''}>
  <ChapterReading/>
  </Suspense>
	</>
}
