"use client"

import { useStoredChapter } from "@/shared/hooks/useStoredChapter"
import { SolarAltArrowRightBold, SolarDoubleAltArrowRightBold } from "@/shared/ui/Icons"
import { Paper,Box,Typography,Button } from "@mui/material"
import Link from 'next/link'

export function ContinueReadingCard(){
  const {storedChapter} = useStoredChapter()

  if(!storedChapter) return

  return <Paper variant="outlined" sx={{
    display:'flex',
    m:2,
    alignItems:'center',
    p:2,
    borderRadius:'20px'
  }}>
    <Box sx={{
      flex:1,
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between'
    }}>
      <Typography variant='subtitle2' color='textSecondary'>
        Continuar leyendo
      </Typography>
      <Typography variant='h5' pt={1} fontWeight={700} component='p'>
        {`${storedChapter.bookTitle} ${storedChapter.chapter}`}
      </Typography>
    </Box>
    <Link href='/read'>
      <Button variant="contained" sx={{
        borderRadius:'100%',
        aspectRatio:'1/1',
      }}>
        <SolarDoubleAltArrowRightBold width={34} height={34} />
      </Button>
    </Link>
  </Paper>
}
