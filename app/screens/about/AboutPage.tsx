import React from 'react'
import { Alert, Platform, SafeAreaView, View } from 'react-native'

import styles from './about.style'
import { Appbar, Button } from 'react-native-paper'
import Header from '../../components/header/Header'
import { RootStackScreenProps } from '../../../types/navigation'

const HomePage = ({ navigation }: RootStackScreenProps<'About'>) => {
  function handleInfo() {
    if (Platform.OS === 'android')
      Alert.alert('Alert!', 'You pressed me. thanks!')
    else Alert.prompt('Prompt IOS', 'You pressed me on iOS!')
  }

  return (
    <>
      <Header title='About' navigation={navigation}>
        <Appbar.Action
          icon='information'
          onPress={handleInfo}
          accessibilityLabel='display info'
        />
      </Header>
      <SafeAreaView style={styles.container}>
        <View>
          <Button
            mode='contained'
            icon='backburger'
            onPress={() => navigation.goBack()}>
            Back To Home
          </Button>
        </View>
      </SafeAreaView>
    </>
  )
}

export default HomePage
