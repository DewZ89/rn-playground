import React, { ReactNode } from 'react'
import { Appbar, useTheme } from 'react-native-paper'
import { RootStackScreenProps } from '../../../types/navigation'

interface Props {
  children?: ReactNode
  title: string | ReactNode
  navigation?: RootStackScreenProps<'About' | 'Home'>['navigation']
}

const Header = ({ title, children, navigation }: Props) => {
  const theme = useTheme()
  return (
    <Appbar.Header
      mode='center-aligned'
      theme={{ colors: { primary: theme.colors.surface } }}
      elevated>
      {navigation?.canGoBack() && (
        <Appbar.BackAction onPress={() => navigation?.goBack()} />
      )}
      <Appbar.Content title={title} />
      {children}
    </Appbar.Header>
  )
}

export default Header
