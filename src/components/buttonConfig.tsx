import { cloneElement, JSX, PropsWithoutRef, ReactNode } from "react";
import {Paper,ButtonBase, Typography, SxProps} from '@mui/material'

interface Props {
  children?:ReactNode,
  icon?:JSX.Element,
  label?:string,
  onClick?:()=>void
  sx?:SxProps
} 

export function ButtonConfig({label,children,icon,onClick,sx}:Props){
  return <Paper onClick={onClick} variant='outlined' sx={{
    flex:1,
    borderRadius:'14px',
    overflow:'hidden',
    ...sx
  }}>
  <ButtonBase sx={{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    gap:1,
    p:2,
    width:'100%',
    height:'100%',
    flexDirection:'column',
  }}>
  {icon && cloneElement(icon,{
    style:{width:'40px',height:'40px'}
  })}
  {label && <Typography textAlign={'center'} variant='subtitle1'>{label}</Typography>}
  {children}
  </ButtonBase>
  </Paper>

}
