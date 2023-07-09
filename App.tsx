import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from './app/screens/home'
import AboutPage from './app/screens/about'
import { PaperProvider } from 'react-native-paper'
import { type RootStackParamList } from './types/navigation'
import { enableLatestRenderer } from 'react-native-maps'
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
  PreferenceContext,
} from './theme'
import MapsPage from './app/screens/maps/MapsPage'

enableLatestRenderer()

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  const { isDarkTheme } = useContext(PreferenceContext)
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name='Home' component={HomePage} />
          <Stack.Screen name='About' component={AboutPage} />
          <Stack.Screen name='Maps' component={MapsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App
