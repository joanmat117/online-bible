"use client"
import { Box} from '@mui/material'
import { useRef,useEffect, useState } from "react"
import NavigationBar from '@/components/navigationBar'
import { ChapterNavigationBar } from './chapterNavigationBar'
import { usePathname } from 'next/navigation'

export function BottomBarWrapper(){
  const barRef = useRef<HTMLElement|null>(null)
  const [barMargin,setBarMargin] = useState(0)
  const firstPath = usePathname().split('/')[1]
  useEffect(()=>{
    if(!barRef.current)return
    setBarMargin(barRef.current.getBoundingClientRect().height)
  },[barRef])

  return <>
    <Box sx={{height:`${barMargin}px`}}>
    </Box>
    <Box ref={barRef} sx={{
      position:'fixed',
      left:0,
      bottom:0,
      width:'100vw'
    }}>
    {
      firstPath == 'read' && <ChapterNavigationBar/>
    }
    <NavigationBar/>
    </Box>
  </>
}
