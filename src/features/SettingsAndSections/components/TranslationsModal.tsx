import { FluentLocalLanguage16Filled } from "@/shared/ui/Icons"
import { SettingAndSectionButton } from "./SettingAndSectionButton"
import { useState } from "react"
import { Modal,List,ListItem,Box,Typography, ListItemText, ListItemButton } from "@mui/material"
import { useBibleStore } from "@/shared/hooks/useBibleStore"
import translations from '@/shared/data/bible-translations.json'
import { BibleTranslationId } from "@/shared/types/BibleTranslations"

interface Translation {
  id:BibleTranslationId,
  name:string,
  language:string
}

export function TranslationsModal(){
  const [isOpen,setIsOpen] = useState(false)
  const {changeTranslation,currentChapter} = useBibleStore()


  return <>
    <SettingAndSectionButton
    icon={<FluentLocalLanguage16Filled/>}
    label="Traducciones"
    onClick={()=>setIsOpen(true)}
    />
    {
      isOpen && <Modal
      open={isOpen}
      onClose={()=>setIsOpen(false)}
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}
      >
      <Box sx={{
        backgroundColor:'background.paper',
        borderRadius:'20px',
        overflow: 'auto',
        maxHeight: '100dvh',
        width:'80vw',
        maxWidth:'400px'


      }}>
      <Typography align='center' variant='h6' py={1} fontWeight={700}>
      Seleccionar Traducción
      </Typography>
      <List disablePadding sx={{
              }}
  
      >
        {translations.map((translation)=>{
          const selected = currentChapter.translation == translation.id
          return <ListItem disablePadding key={translation.id} onClick={()=>changeTranslation(translation.id as Translation['id'])} sx={{
            backgroundColor: selected? 'primary.main' :undefined
          }}>
          <ListItemButton>  
          <ListItemText
          sx={{
            color:selected?'#000':undefined,
          }}
  
          slotProps={{
            primary: {
              sx:{
                fontWeight:selected?'bold':undefined
              }
            },
            secondary: {
            sx: { color: selected ? 'primary.contrastText':undefined }
          }
          }}
          primary={translation.name}
          secondary={(()=>{
            if (translation.language == 'spa') return 'Español'
          })()}
          >
            </ListItemText>
            </ListItemButton>
          </ListItem>
        })} 
      </List>
      </Box>
      </Modal>
    }
  </>
}
