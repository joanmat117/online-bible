"use client"
import { Icon,Autocomplete,Stack,Paper,TextField, Typography } from "@mui/material";
import { KeyboardEvent,useState } from "react";
import { Search } from "lucide-react";
import chaptersArray from '@/data/chaptersArray.json'
import { getBookByQuery } from "@/utils/books-utilities";
import { useRouter} from 'next/navigation'

export function ChapterSearchBar(){
  const router  = useRouter()
  const [error,setError] = useState<string>('')
  function showError(error:string){
    setError(error)
    setTimeout(() => {
      setError('')
    }, 4000);
  }
  function handleEnterPress(e:KeyboardEvent<HTMLDivElement>){
    if(e.key !== "Enter" || !e.target) return
    const inputValue = (e.target as HTMLInputElement).value
    if(!inputValue) return showError('Campo vacio')
    const [book,chapter] = inputValue.split(' ')
    const chapterNumb = Number(chapter)
    const bookValidated = getBookByQuery(book)
    if(!bookValidated) return showError('Libro no encontrado')
    const chapterValidated = chapterNumb <= bookValidated.numberOfChapters && chapterNumb > 0? chapterNumb : 1
    router.push(`/read?book=${bookValidated.title}&chapter=${chapterValidated}`)
  }

  return <Stack direction='column' sx={{
    mb:6,
  }}>
    <Paper elevation={1} variant="outlined" sx={{
    borderRadius:'100px',
    display:'flex',
    width:'100%',
    alignItems:'center',
    maxWidth:{xs:'300px',sm:'400px'},
    mx:'auto',
    backgroundColor:'background.paper'
  }}>
    <Autocomplete
      freeSolo
      size="small"
      sx={{width:'100%',fontSize:30,display:'flex',alignItems:'center'}}
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
    <Icon sx={{width:40,height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'text.secondary'}} >
      <Search/>
    </Icon>
  </Paper>
  <Typography sx={{pt:1,opacity:error?1:0,transition:400}} variant="caption" color='error' textAlign={'center'}>
        {error || 'nada'}
  </Typography>
  </Stack>
}

