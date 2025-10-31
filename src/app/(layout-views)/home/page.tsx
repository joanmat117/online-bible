import { ChapterSearchBar } from "@/components/chapterSearchBar";
import { RandomVerseCard } from "@/components/randomVerseCard";
import {Box, Typography} from '@mui/material'
export default function Home() {
  return <Box sx={{
    paddingY:3,
    paddingX:1
  }}>
    <Typography color={'textPrimary'} variant="h1" component={'h1'} textAlign={'center'} sx={{
      fontFamily:'"UnifrakturMaguntia"',
      fontWeight:800,
      py:4
    }}>
      Biblia Online
    </Typography>
    <ChapterSearchBar/>
    <RandomVerseCard/>
  </Box>;
}
