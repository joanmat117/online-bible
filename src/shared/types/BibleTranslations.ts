export type BibleTranslationId = 
 | "spa_bes"
  | "spa_onbv"
  | "spa_pdt"
  | "spa_r09"
  | "spa_rvg"
  | "spa_v2p"
  | "spa_vbl"

export interface BibleTranslation {
  id:BibleTranslationId,
  name:string,
  language:string
} 
