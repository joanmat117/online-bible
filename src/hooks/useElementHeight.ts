import {useEffect,useState,useRef} from 'react'

export function useElementHeight(){
  
  const ref = useRef<HTMLElement|null>(null)
  const [height,setHeight] = useState(0)
  
  useEffect(()=>{
  
    if(!ref.current)return
    
      setHeight(ref.current.getBoundingClientRect().height)
  
  },[ref])

  return {height,ref}
}
