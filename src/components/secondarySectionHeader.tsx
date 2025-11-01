import {Box,Paper, IconButton, Typography} from '@mui/material'
import { SolarAltArrowLeftBold } from './icons'
import Link from 'next/link' 

export function SecondarySectionHeader({title,backTo}:{title:string,backTo:string}){
  return <>
    <Box sx={{
      display:'flex',
      alignItems:'center',
      py:1.5,
      position:'sticky',
      top:0,
      backgroundColor:'background.default',
      justifyContent:'center'
    }}>
      <Link href={backTo}>
      <IconButton sx={{
          position:'absolute',
          left:0,
          mx:2,
          top:'50%',
          translate:'0 -50%'
        }}>
        <SolarAltArrowLeftBold/>
      </IconButton>
      </Link>
      <Typography fontWeight={600} variant='h6' component='h1'>
        {title}
      </Typography>
    </Box>
  </>
}
