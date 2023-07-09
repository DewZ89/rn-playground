import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import merge from 'deepmerge'
import { FC, ReactNode, createContext, useState } from 'react'
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper'

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
})

interface PreferenceProviderProps {
  children: ReactNode
}

export const PreferenceContext = createContext({
  toggleTheme: () => {},
  isDarkTheme: false,
})

export function PreferenceProvider({ children }: PreferenceProviderProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  function toggleTheme() {
    setIsDarkTheme(prev => !prev)
  }

  return (
    <PreferenceContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </PreferenceContext.Provider>
  )
}

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme)
export const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme)
