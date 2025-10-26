"use client"
import { Autocomplete,IconButton,Paper,TextField } from "@mui/material";
import { KeyboardEvent } from "react";
import { Search } from "lucide-react";
import chaptersArray from '@/data/chaptersArray.json'
import { getBookByQuery } from "@/utils/books-utilities";
import { useRouter} from 'next/navigation'

export function ChapterSearchBar(){
  const router  = useRouter() 
  function handleEnterPress(e:KeyboardEvent<HTMLDivElement>){
    if(e.key !== "Enter" || !e.target) return
    const inputValue = (e.target as HTMLInputElement).value
    if(!inputValue) return
    const [book,chapter] = inputValue.split(' ')
    const chapterNumb = Number(chapter)
    const bookValidated = getBookByQuery(book)
    if(!bookValidated) return
    const chapterValidated = chapterNumb <= bookValidated.numberOfChapters && chapterNumb > 0? chapterNumb : 1
    router.push(`/read?book=${bookValidated.title}&chapter=${chapterValidated}`)
  }

  return <Paper elevation={1} variant="outlined" sx={{
    display:'flex',
    borderRadius:'100px',
    maxWidth:{xs:'300px',sm:'400px'},
    mx:'auto',
    backgroundColor:'background.paper'
  }}>
    <Autocomplete
      freeSolo
      size="small"
      sx={{width:'100%'}}
      options={chaptersArray}
      renderInput={(params)=>(
        <TextField
          onKeyDown={handleEnterPress}
        sx={{
          padding:"0px 5px",
          "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none", // Sin borde normal
          },
          "&:hover fieldset": {
            border: "none", // Sin borde en hover
          },
          "&.Mui-focused fieldset": {
            border: "none", // Sin borde en focus
          }
          }
        }} 
        {...params}
      />
    )}
    />
    <IconButton>
      <Search/>
    </IconButton>
  </Paper>
}

