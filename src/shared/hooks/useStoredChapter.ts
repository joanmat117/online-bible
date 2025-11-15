"use client"
import { useState, useEffect } from "react";
import { CurrentChapter } from "@/shared/contexts/useBibleStore";

export function useStoredChapter() {
  const [storedChapter, setStoredChapter] = useState<CurrentChapter | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentChapter');
    if (stored) {
      setStoredChapter(JSON.parse(stored));
    }
  }, []);

  const changeStoredChapter = (chapter: CurrentChapter) => {
    localStorage.setItem('currentChapter', JSON.stringify(chapter));
    setStoredChapter(chapter);
  }

  return { storedChapter, setStoredChapter: changeStoredChapter }
}
