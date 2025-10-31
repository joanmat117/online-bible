import { BottomBarWrapper } from "@/components/bottomBarWrapper";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function Roout({
  children,
}: Readonly<{
  children: ReactNode
    ;
}>) {
  return <>
  <Box sx={{
    marginX:'auto',
    width:'100%',
    maxWidth:'md',
    display:'flex',
    flexDirection:'column',
    flex:1
  }}
  >
    {children}
  </Box>
  <BottomBarWrapper/>
 </> 
}
