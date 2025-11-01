import { RenderSavedVerses } from "@/components/renderSavedVerses";
import { SecondarySectionHeader } from "@/components/secondarySectionHeader";

export default function Page(){

  return <>
  <SecondarySectionHeader backTo='/settings' title="Versiculos Guardados" />
  <RenderSavedVerses/>
  </>
}
