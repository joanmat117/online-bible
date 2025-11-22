"use client"
import { useState, useEffect } from "react";
import { CurrentChapter } from "@/shared/contexts/useBibleStore";

export function useStoredChapter() {
  const [storedChapter, setStoredChapter] = useState<CurrentChapter | null>(null);

  const fetchStoredChapter = ()=>{
    const stored = localStorage.getItem('currentChapter');
    if (stored) {
      return JSON.parse(stored) as (CurrentChapter | null)
    }
  }

  useEffect(() => {
      setStoredChapter(fetchStoredChapter() || null) 
  }, []);

  const changeStoredChapter = (chapter: CurrentChapter) => {
    localStorage.setItem('currentChapter', JSON.stringify(chapter));
    setStoredChapter(chapter);
  }

  return { storedChapter, setStoredChapter: changeStoredChapter,fetchStoredChapter }
}
