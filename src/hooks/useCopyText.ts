"use client"
import { useState } from "react";

export function useCopyText(){
  const [copyState,setCopyState] = useState<-1|0|1>(0)

  async function copyText(text:string){
    try {
            await navigator.clipboard.writeText(text)
            setCopyState(1)
        } catch (err) {
            console.error('Error al copiar el texto: ', err);
            setCopyState(-1)
        } finally {
            setTimeout(() => {
              setCopyState(0)
            }, 2000)
        }
    }

  return {copyState,copyText}
}
