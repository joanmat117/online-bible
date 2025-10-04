import { Box } from "@mui/material";

export default function Roout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
  </>
}