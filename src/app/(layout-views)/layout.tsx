import { Box } from "@mui/material";
import { ReactNode } from "react";
import { BottomBarSpacer } from "@/shared/ui/BottomBarSpacer";
import NavigationBar from "@/features/NavigationBar";
import { ChapterNavigationBar } from "@/features/ChapterNavigationBar";

export default function LayoutViews({
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
  <BottomBarSpacer>
    <ChapterNavigationBar/>
    <NavigationBar/>
  </BottomBarSpacer>
 </> 
}
