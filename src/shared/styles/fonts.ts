import {Lato,Crimson_Pro,Funnel_Display} from 'next/font/google'

export const lato = Lato({
  weight:["400","700"],
  style:"normal",
  preload:true,
  subsets:["latin"],
  fallback:["sans-serif"],
})

export const crimsonPro = Crimson_Pro({
  weight:["400","700"],
  style:"normal",
  preload:true,
  subsets:["latin"],
  fallback:["sans-serif"],
})

export const funnelDisplay = Funnel_Display({
  weight:["800"],
  style:"normal",
  preload:true,
  subsets:["latin"],
  fallback:["sans-serif"],
})
