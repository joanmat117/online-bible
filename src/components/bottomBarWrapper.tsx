"use client"
import { Box} from '@mui/material'
import NavigationBar from '@/components/navigationBar'
import { ChapterNavigationBar } from './chapterNavigationBar'
import { usePathname } from 'next/navigation'
import { useElementHeight } from '@/hooks/useElementHeight'

export function BottomBarWrapper(){
  const firstPath = usePathname().split('/')[1]
  const {ref:heightRef,height} = useElementHeight()

  return <>
    <Box sx={{height:`${height}px`}}></Box>
    
    <Box ref={heightRef} sx={{position:'fixed',left:0,bottom:0,width:'100vw'}}>
    
    {firstPath == 'read' && <ChapterNavigationBar/>}
    <NavigationBar/>
    
    </Box>
  </>
}
