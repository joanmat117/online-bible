import { X } from 'lucide-react'
import { removeSavedVerseFromDB} from '@/shared/services/savedVersesApi'
import { IconButton, Stack,Box,Typography } from '@mui/material'
import { useColor } from '@/shared/hooks/useColor'
import { crimsonPro } from '@/shared/styles/fonts'

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

  const color = useColor(verse.id)
  
  return <Stack px={1} py={2} gap={2}>
        <Box key={verse.id} sx={{
          display:'flex',
          flexDirection:'column',
          backgroundColor:'background.paper',
          borderRadius:'10px',
          border:'1px solid',
          borderColor:color.background,
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
          
          <IconButton onClick={()=>removeSavedVerseFromDB(verse.id)} sx={{color:color.foreground}}>
            <X/>
          </IconButton>
        </Stack>
              <Typography p={1.4} sx={{display:'inline',lineHeight:1.4,fontSize:20,fontFamily:crimsonPro.style.fontFamily}} variant='body1' fontWeight={ 400}>
              {verse.content}
              </Typography>
        </Box>
    </Stack>
}
