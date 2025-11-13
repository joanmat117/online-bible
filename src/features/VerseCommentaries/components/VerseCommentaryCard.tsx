import { removeVerseCommentaryFromDB, updateVerseCommentaryFromDB } from '@/shared/services/verseCommentariesApi'
import { X } from 'lucide-react'
import { Fade, IconButton, Stack, TextField } from '@mui/material'
import {Box,Typography,Icon} from '@mui/material'
import { useColor } from '@/shared/hooks/useColor'
import { ChangeEvent } from 'react'
import { SolarPen2Linear } from '@/shared/ui/Icons'

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
  const onEditComment = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      updateVerseCommentaryFromDB({
        id:verse.id,
        comment:String(e.target.value)
      })
  }

  if(!verse.comment) return
  return <Fade in={true} timeout={600}>
    <Stack px={1} py={2} gap={2}>
        <Box key={verse.id} sx={{
          display:'flex',
          flexDirection:'column',
          backgroundColor:'background.paper',
          borderRadius:'10px',
          overflow:'hidden',
          border:'1px solid',
          borderColor:color.background
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
              <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <TextField onChange={onEditComment} margin='none' size='small' multiline defaultValue={verse.comment} sx={{
                whiteSpace:'pre-wrap',
                padding:1,
                fontSize:18,
                width:'full',
                flex:1,
                "& .MuiInput-underline": {
                "&:before": {
                  borderBottom: "none" // Quita la línea inferior normal
                },
                "&:after": {
                  borderBottom: "none" // Quita la línea inferior en focus
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "none" // Quita la línea inferior en hover
                }
              }
              }} variant='standard' type='text' />
              <SolarPen2Linear style={{margin:3,opacity:0.5}}/>
              </Box>
        </Box>
    </Stack>
  </Fade>
}
