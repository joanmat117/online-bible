import {Suspense} from 'react'
import { ChapterReading } from '@/features/ChapterReading'

export default function Read(){
 
  return <>
  <Suspense fallback={''}>
  <ChapterReading/>
  </Suspense>
	</>
}
