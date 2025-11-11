import { VerseCommentaries } from "@/features/VerseCommentaries";
import { SimpleSectionHeader } from "@/shared/ui/SimpleSectionHeader";

export default function Page(){

  return <>
  <SimpleSectionHeader backTo='/settings' title="Comentarios" />
  <VerseCommentaries/>
  </>
}
