import { ChapterSearchBar } from "@/features/ChapterSearchBar";
import { ContinueReadingCard } from "@/features/ContinueReadingCard";
import { RandomVerse } from "@/features/RandomVerse";
import {Box, Typography} from '@mui/material'
export default function Home() {
  return <Box sx={{
    paddingY:3,
    paddingX:1
  }}>
    <Typography color={'primary'} variant="h1" component={'h1'} textAlign={'center'} sx={{
      fontFamily:'"Funnel Display"',
      fontWeight:800,
      py:4,
      fontSize: {
        xs: 50,
        md: 80
      }
    }}>
      Biblia Online
    </Typography>
    <ChapterSearchBar/>
    <RandomVerse/>
    <ContinueReadingCard/>
  </Box>;
}
