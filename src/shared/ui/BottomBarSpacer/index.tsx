"use client"
import { Box} from '@mui/material'
import { useElementHeight } from '@/shared/hooks/useElementHeight'
import { ReactNode } from 'react'

export function BottomBarSpacer({children}:{children:ReactNode}){
  const {ref:heightRef,height} = useElementHeight()

  return <>
    <Box sx={{height:`${height}px`}}></Box>
    
    <Box ref={heightRef} sx={{position:'fixed',left:0,bottom:0,width:'100vw'}}>
      {children} 
    </Box>
  </>
}
