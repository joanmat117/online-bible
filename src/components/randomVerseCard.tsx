"use client"
import { useRandomVerse } from "@/hooks/useRandomVerse";
import { useBibleStore } from "@/zustand/useBibleStore";
import { Typography,Stack,IconButton} from "@mui/material";
import { useRouter } from "next/navigation";
import { SolarCheckCircleLinear, SolarCloseCircleLinear, SolarCopyLinear, SolarRefreshCircleLinear, SolarRoundAltArrowRightBroken } from "./icons";

export function RandomVerseCard(){
  const {copyState,verseRoute,copyToClipboard,reloadRandomVerse,randomVerse} = useRandomVerse()
  const changeChapter = useBibleStore(store=>store.changeChapter)
  const router = useRouter()

  if(!randomVerse) return
  return <Stack direction='column' gap={1} sx={{
    borderRadius:'20px',
    px:2,
    py:1,
    m:2,
    border:1,
    borderColor:'primary.main',
    backgroundColor:'background.paper',
  }}>
  <Stack direction={'row'} sx={{justifyContent:'space-between',alignItems:'center'}}>
    <Typography sx={{fontFamily:'"Lato"',fontWeight:600}} color="textSecondary" variant='body1'>{verseRoute}</Typography>
    <IconButton onClick={()=>{
      changeChapter({bookId:randomVerse.bookId,chapter:randomVerse.chapter})
      router.push('/read')
    }}>
      <SolarRoundAltArrowRightBroken/>
    </IconButton>
  </Stack>
  <Typography variant="body1" sx={{fontFamily:'"Crimson Pro"',fontSize:20}}>
    {randomVerse.text}
  </Typography>
  <Stack direction='row' sx={{justifyContent:'space-between'}}>
    <IconButton onClick={()=>reloadRandomVerse()}>
     <SolarRefreshCircleLinear/>
    </IconButton>
    <IconButton onClick={()=>copyToClipboard()}>
      {copyState === 0 && <SolarCopyLinear/>}
      {copyState === 1 && <SolarCheckCircleLinear/>}
      {copyState === -1 && <SolarCloseCircleLinear/>}
    </IconButton>
  </Stack>
  </Stack>
}
