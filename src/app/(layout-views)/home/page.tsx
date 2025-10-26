import { ChapterSearchBar } from "@/components/chapterSearchBar";
import { RandomVerseCard } from "@/components/randomVerseCard";
import {Box} from '@mui/material'
export default function Home() {
  return <Box sx={{
    paddingY:3,
    paddingX:1
  }}>
    <ChapterSearchBar/>
    <RandomVerseCard/>
  </Box>;
}
