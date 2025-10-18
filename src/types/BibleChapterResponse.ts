export type BibleChapterResponse = {
  translation: {
    id: string;
    name: string;
    website: string;
    licenseUrl: string;
    licenseNotes: string | null;
    shortName: string;
    englishName: string;
    language: string;
    textDirection: string;
    sha256: string;
    availableFormats: string[];
    listOfBooksApiLink: string;
    numberOfBooks: number;
    totalNumberOfChapters: number;
    totalNumberOfVerses: number;
    languageName: string;
    languageEnglishName: string;
  };
  book: {
    id: string;
    translationId: string;
    name: string;
    commonName: string;
    title: string;
    order: number;
    numberOfChapters: number;
    sha256: string;
    firstChapterNumber: number;
    firstChapterApiLink: string;
    lastChapterNumber: number;
    lastChapterApiLink: string;
    totalNumberOfVerses: number;
  };
  chapter: {
    number: number;
    content: {
      type: string;
      number: number;
      content: string[];
    }[];
    footnotes: any[];
  };
  thisChapterLink: string;
  thisChapterAudioLinks: Record<string, string>;
  nextChapterApiLink: string;
  nextChapterAudioLinks: Record<string, string>;
  previousChapterApiLink: string;
  previousChapterAudioLinks: Record<string, string>;
  numberOfVerses: number;
};
