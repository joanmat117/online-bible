import NavigationBar from "@/components/navigationBar";
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
    maxWidth:'md',
    minHeight:'100dvh'
  }}
  >
    {children}
  </Box>
  <NavigationBar/>
  </>
}
