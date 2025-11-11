import { SimpleSectionHeader } from "@/shared/ui/SimpleSectionHeader"
import { SavedVerses } from "@/features/SavedVerses"

export default function Page(){

  return <>
  <SimpleSectionHeader backTo='/settings' title="Versiculos Guardados" />
  <SavedVerses/>
  </>
}
