import { cloneElement, JSX, ReactNode } from "react";
import {Paper,ButtonBase, Typography, SxProps} from '@mui/material'
import Link from 'next/link'

interface Props {
  children?:ReactNode,
  icon?:JSX.Element,
  label?:string,
  onClick?:()=>void
  sx?:SxProps,
  href?:string
} 

export function SettingAndSectionButton({href,label,children,icon,onClick,sx}:Props){
  const button = <ButtonBase sx={{
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

  return <Paper onClick={onClick} variant='outlined' sx={{
    flex:1,
    minWidth:'140px',
    borderRadius:'14px',
    overflow:'hidden',
    ...sx
  }}>
  {href?
  <Link href={href} style={{
    textDecoration:'none',
    color:'inherit'
  }}>
  {button}
  </Link>
  :
  button
  } 
  </Paper>

}
