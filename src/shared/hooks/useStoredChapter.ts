"use client"
import { useState, useEffect } from "react";
import { CurrentChapterStore } from "@/shared/types/CurrentChapterStore";

const storedChapterName = 'CHV2'

export function useStoredChapter() {
  const [storedChapter, setStoredChapter] = useState<CurrentChapterStore | null>(null);

  const fetchStoredChapter = ()=>{
    const stored = localStorage.getItem(storedChapterName);
    if (stored) {
      return JSON.parse(stored) as (CurrentChapterStore | null)
    }
  }

  useEffect(() => {
      setStoredChapter(fetchStoredChapter() || null) 
  }, []);

  const changeStoredChapter = (chapter: CurrentChapterStore) => {
    localStorage.setItem(storedChapterName, JSON.stringify(chapter));
    setStoredChapter(chapter);
  }

  return { storedChapter, setStoredChapter: changeStoredChapter,fetchStoredChapter }
}
