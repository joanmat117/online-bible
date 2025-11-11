import { useMuiTheme } from "@/shared/contexts/MuiThemeContext"
import colors from "@/shared/data/colors.json"
import { useMemo } from "react"

export function useColor(number:number){
  
  const {mode} = useMuiTheme()
  
  const {pure,background,foregroundDark,foregroundLight} = useMemo(()=>colors[Math.floor(number % colors.length)],[number])
  
  const foreground = mode == 'dark'? 
    foregroundLight:
    foregroundDark

  return {
    foreground,
    pure,
    background,
  }
}
