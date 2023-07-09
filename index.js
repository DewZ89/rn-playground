/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { PreferenceProvider } from './theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

function Main() {
  return (
    <PreferenceProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
      </GestureHandlerRootView>
    </PreferenceProvider>
  )
}

AppRegistry.registerComponent(appName, () => Main)
