import { SettingsAndSections } from "@/features/SettingsAndSections"
import {Box} from '@mui/material'

export default function Settings(){
  return <>
    <SettingsAndSections/>  
    <Box sx={{
      maxWidth:'250px',
      aspectRatio:'1/1',
      borderRadius:1000,
      m:'auto',
      overflow:'hidden'
    }} >
      <img style={{width:'100%',height:'100%'}} src={'https://i.postimg.cc/7ZSwcKVr/bwink-msc-01-single-02.jpg'} />
    </Box>
  </>
}
