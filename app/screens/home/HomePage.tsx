import React, { useContext } from 'react'
import { SafeAreaView, View } from 'react-native'
import { Button, Switch, Text } from 'react-native-paper'

import styles from './home.style'
import { PreferenceContext } from '../../../theme'
import { RootStackScreenProps } from '../../../types/navigation'

const HomePage = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const { toggleTheme, isDarkTheme } = useContext(PreferenceContext)

  function goToAbout() {
    navigation.navigate('About')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.heading} variant='headlineLarge'>
          Welcome to RN Playground!
        </Text>
        <Button
          style={styles.button}
          mode='contained'
          onPress={() => navigation.navigate('Maps')}>
          Show Maps
        </Button>
        <Button
          style={styles.button}
          mode='contained'
          onPress={() => navigation.navigate('About')}>
          Go to About
        </Button>
      </View>
      <View style={styles.switchContainer}>
        <Text variant='bodyMedium'>Enable dark theme</Text>
        <Switch
          testID='home-page-toggle-theme-switch'
          onValueChange={toggleTheme}
          value={isDarkTheme}
        />
      </View>
    </SafeAreaView>
  )
}

export default HomePage
