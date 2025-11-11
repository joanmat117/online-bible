import { removeVerseCommentaryFromDB } from '@/shared/services/verseCommentariesApi'
import { X } from 'lucide-react'
import { IconButton, Stack } from '@mui/material'
import {Box,Typography} from '@mui/material'
import { useColor } from '@/shared/hooks/useColor'

interface Props {
  verse: {
    bookTitle: string | undefined;
    id: number;
    content: string;
    comment: string;
    bookId: string;
    chapter: number;
    number: number;
  }
}

export function VerseCommentaryCard({verse}:Props){
  const color = useColor(verse.id)

  if(!verse.comment) return
  return <>
    <Stack px={1} py={2} gap={2}>
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
          <Typography variant='subtitle1' fontWeight={700} sx={{color:color.foreground}}>
            {verse.bookTitle + ' ' + verse.chapter + ':' + verse.number}
          </Typography>
          
          <IconButton onClick={()=>removeVerseCommentaryFromDB(verse.id)} sx={{color:color.foreground}}>
            <X/>
          </IconButton>
        </Stack>
              <Typography p={1.3} color='textSecondary' sx={{display:'inline',backgroundColor:'background.default',lineHeight:1.3,fontSize:17,fontFamily:'"Crimson Pro"'}} variant='body1' fontWeight={ 400}>
              {verse.content}
              </Typography>
              <Typography p={1.4} sx={{display:'inline',whiteSpace:'pre-wrap',lineHeight:1.4,fontSize:18}} variant='body1' fontWeight={ 400}>
              {verse.comment}
              </Typography>
        </Box>
    </Stack>
  </>
}
