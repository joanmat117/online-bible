"use client"
import { useRandomVerse } from "@/hooks/useRandomVerse";
import { useBibleStore } from "@/zustand/useBibleStore";
import { Typography,Stack,IconButton} from "@mui/material";
import { SolarCheckCircleLinear, SolarCloseCircleLinear, SolarCopyLinear, SolarRefreshCircleLinear, SolarRoundAltArrowRightBroken } from "./icons";
import versesColor from '@/data/versesColor.json'
import { useMemo } from "react";
import { useTheme } from "@/components/themeContext";
import Link from 'next/link'

export function RandomVerseCard(){
  const {mode} = useTheme()
  const {copyState,verseRoute,copyToClipboard,reloadRandomVerse,randomVerse} = useRandomVerse()
  const changeChapter = useBibleStore(store=>store.changeChapter)

  const color = useMemo(()=>versesColor[Math.floor(randomVerse ? randomVerse.chapter%versesColor.length:0)],[randomVerse])
  

  const textColor = mode == 'light'? color.foregroundDark : color.foregroundLight


  if(!randomVerse) return

  return <Stack direction='column' gap={1} sx={{
    borderRadius:'20px',
    px:2,
    py:1,
    m:2,
    color:'primary.contrastText',
    backgroundColor:'primary.main',
  }}>
  <Stack direction={'row'} sx={{justifyContent:'space-between',alignItems:'center'}}>
    <Typography sx={{fontFamily:'"Lato"',fontWeight:600,opacity:0.8}} color="primary.contrastText" variant='body1'>{verseRoute}</Typography>
      <Link href='/read'>
        <IconButton sx={{color:'primary.contrastText'}} onClick={()=>{
          changeChapter({bookId:randomVerse.bookId,chapter:randomVerse.chapter})
        }}>
          <SolarRoundAltArrowRightBroken/>
        </IconButton>
      </Link>
  </Stack>
  <Typography variant="body1" sx={{fontFamily:'"Crimson Pro"',fontSize:20}}>
    {randomVerse.text}
  </Typography>
  <Stack direction='row' sx={{justifyContent:'space-between'}}>
    <IconButton sx={{color:'primary.contrastText'}} onClick={()=>reloadRandomVerse()}>
     <SolarRefreshCircleLinear/>
    </IconButton>
    <IconButton sx={{color:'primary.contrastText'}} onClick={()=>copyToClipboard()}>
      {copyState === 0 && <SolarCopyLinear/>}
      {copyState === 1 && <SolarCheckCircleLinear/>}
      {copyState === -1 && <SolarCloseCircleLinear/>}
    </IconButton>
  </Stack>
  </Stack>
}
