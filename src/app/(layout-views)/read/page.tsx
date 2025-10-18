import { ChapterRender } from "@/components/chapterRender"
import {Suspense} from 'react'

export default function Read(){
 
  return <>
  <Suspense fallback={''}>
  <ChapterRender/>
  </Suspense>
	</>
}
