"use client"
import { Autocomplete,Stack,Paper,TextField, Typography, IconButton } from "@mui/material";
import { KeyboardEvent,useState } from "react";
import { Search } from "lucide-react";
import booksArray from './data/booksArray.json'
import { getBookByQuery } from "@/shared/utils/booksUtilities";
import { useRouter} from 'next/navigation'
import {useRef} from 'react'

export function ChapterSearchBar(){
  const router  = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error,setError] = useState<string>('')
  function showError(error:string){
    setError(error)
    setTimeout(() => {
      setError('')
    }, 4000);
  }
  function validateAndSearch(value:string){ 
    if(!value) return showError('Campo vacio')
    const [book,route] = value.split(' ')
    const [chapter] = route.split(':')
    const chapterNumb = Number(chapter)
    const bookValidated = getBookByQuery(book)
    if(!bookValidated) return showError('Libro no encontrado')
    const chapterValidated = chapterNumb <= bookValidated.numberOfChapters && chapterNumb > 0? chapterNumb : 1
    router.push(`/read?book=${bookValidated.title}&chapter=${chapterValidated}`)

  }
  function handleEnterPress(e:KeyboardEvent<HTMLDivElement>){
    if(e.key !== "Enter" || !e.target) return
    const inputValue = (e.target as HTMLInputElement).value
    validateAndSearch(inputValue)
  }
  function handleButtonPress(){
    if(!inputRef.current) return
    validateAndSearch(inputRef.current.value)
  }

  return <Stack direction='column' sx={{
    mb:4,
  }}>
    <Paper elevation={1} variant="outlined" sx={{
    borderRadius:'100px',
    display:'flex',
    width:'100%',
    borderColor:(t)=>t.palette.primary.main,
    alignItems:'center',
    maxWidth:{xs:'300px',sm:'400px'},
    mx:'auto',
    backgroundColor:'background.paper'
  }}>
    <Autocomplete
      freeSolo
      size="small"
      sx={{width:'100%',fontSize:30,display:'flex',alignItems:'center'}}
      options={booksArray}
      slotProps={{
          paper:{
            variant:'outlined',
            sx:{
              borderRadius:'20px',
              border:'none'
            }
          }
        }}
      renderInput={(params)=>(
        <TextField
        inputRef={inputRef}
        placeholder="Romanos 12"
          onKeyDown={handleEnterPress}
        sx={{
          padding:"3px 4px",
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
    <IconButton onClick={handleButtonPress} sx={{width:40,height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'primary.main'}} >
      <Search/>
    </IconButton>
  </Paper>
  <Typography sx={{pt:1,opacity:error?1:0,transition:400}} variant="caption" color='error' textAlign={'center'}>
        {error || 'nada'}
  </Typography>
  </Stack>
}

