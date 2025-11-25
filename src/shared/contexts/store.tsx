import { configureStore } from "@reduxjs/toolkit"
import bibleSlice from './storeSlices/bibleSlice'
import { Provider } from "react-redux"
import { ReactNode } from "react"

export const store = configureStore({
  reducer:{
    bible:bibleSlice
  }
})

export type StoreState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch

export function AppStoreProvider({children}:{children:ReactNode}){
  return <Provider store={store} >
    {children}
  </Provider>
}
