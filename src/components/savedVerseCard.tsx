import { X } from 'lucide-react'
import versesColor from '@/data/versesColor.json'
import {useTheme} from '@/components/themeContext'
import { removeSavedVerseFromDB} from '@/services/savedVersesApi'
import { IconButton, Stack,Box,Typography } from '@mui/material'
import { useMemo } from 'react'

interface Props {
  verse:{
    bookTitle: string | undefined;
    id: number;
    content: string;
    bookId: string;
    chapter: number;
    number: number;
  }
}

export function SavedVerseCard({verse}:Props){
  const {mode} = useTheme()
  const color = useMemo(()=>versesColor[verse.id % versesColor.length],[verse])
  const foregroundColor = mode == 'dark'? 
    color.foregroundLight:
    color.foregroundDark
  return <Stack px={1} py={2} gap={2}>
        <Box key={verse.id} sx={{
          display:'flex',
          flexDirection:'column',
          backgroundColor:'background.paper',
          borderRadius:'15px',
          overflow:'hidden'
        }}>
        <Stack direction='row' sx={{
          justifyContent:'space-between',
          alignItems:'center',
          px:2,
          backgroundColor:color.background
        }}>
          <Typography variant='subtitle1' fontWeight={700} sx={{color:foregroundColor}}>
            {verse.bookTitle + ' ' + verse.chapter + ':' + verse.number}
          </Typography>
          
          <IconButton onClick={()=>removeSavedVerseFromDB(verse.id)} sx={{color:foregroundColor}}>
            <X/>
          </IconButton>
        </Stack>
              <Typography p={1.4} sx={{display:'inline',lineHeight:1.4,fontSize:20,fontFamily:'"Crimson Pro"'}} variant='body1' fontWeight={ 400}>
              {verse.content}
              </Typography>
        </Box>
    </Stack>
}
