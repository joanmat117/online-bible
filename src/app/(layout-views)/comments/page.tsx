import { RenderVersesComments } from "@/components/renderVersesComments";
import { SecondarySectionHeader } from "@/components/secondarySectionHeader";

export default function Page(){

  return <>
  <SecondarySectionHeader backTo='/settings' title="Comentarios" />
  <RenderVersesComments/>
  </>
}
