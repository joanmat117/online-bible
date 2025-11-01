"use client"
import { useRandomVerse } from "@/hooks/useRandomVerse";
import { useBibleStore } from "@/zustand/useBibleStore";
import { Typography,Stack,IconButton} from "@mui/material";
import { useRouter } from "next/navigation";
import { SolarCheckCircleLinear, SolarCloseCircleLinear, SolarCopyLinear, SolarRefreshCircleLinear, SolarRoundAltArrowRightBroken } from "./icons";
import versesColor from '@/data/versesColor.json'
import { useEffect, useRef } from "react";
import { useTheme } from "@/components/themeContext";
import Link from 'next/link'

function getRandomColor(){
  return versesColor[Math.floor(Math.random()*versesColor.length)]
}

export function RandomVerseCard(){
  const {mode} = useTheme()
  const {copyState,verseRoute,copyToClipboard,reloadRandomVerse,randomVerse} = useRandomVerse()
  const changeChapter = useBibleStore(store=>store.changeChapter)
  const router = useRouter()
  const color = useRef(getRandomColor())

  const textColor = mode == 'light'? color.current.foregroundDark : color.current.foregroundLight

  useEffect(()=>{color.current = getRandomColor()},[randomVerse])

  if(!randomVerse) return

  return <Stack direction='column' gap={1} sx={{
    borderRadius:'20px',
    px:2,
    py:1,
    m:2,
    border:1,
    color:textColor,
    backgroundColor:color.current.background,
  }}>
  <Stack direction={'row'} sx={{justifyContent:'space-between',alignItems:'center'}}>
    <Typography sx={{fontFamily:'"Lato"',fontWeight:600}} color="textSecondary" variant='body1'>{verseRoute}</Typography>
      <Link href='/read'>
        <IconButton sx={{color:textColor}} onClick={()=>{
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
    <IconButton sx={{color:textColor}} onClick={()=>reloadRandomVerse()}>
     <SolarRefreshCircleLinear/>
    </IconButton>
    <IconButton sx={{color:textColor}} onClick={()=>copyToClipboard()}>
      {copyState === 0 && <SolarCopyLinear/>}
      {copyState === 1 && <SolarCheckCircleLinear/>}
      {copyState === -1 && <SolarCloseCircleLinear/>}
    </IconButton>
  </Stack>
  </Stack>
}
