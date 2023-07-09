import { ComponentType, JSX } from 'react'
import { render } from '@testing-library/react-native'
import { RootStackParamList, RootStackScreenProps } from '../types/navigation'

export function renderScreen<
  T extends RootStackScreenProps<keyof RootStackParamList>,
>(
  Component: (props: T) => JSX.Element,
  props: T,
  wrapper?: ComponentType<any>,
) {
  return render(<Component {...props} />, { wrapper })
}
