import { renderScreen } from '../tests/utils'
import AboutPage from '../app/screens/about'
import { RootStackScreenProps } from '../types/navigation'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { fireEvent, screen, waitFor } from '@testing-library/react-native'
import { PaperProvider } from 'react-native-paper'
import { Alert } from 'react-native'

describe('AboutPage', () => {
  const props: DeepMockProxy<RootStackScreenProps<'About'>> =
    mockDeep<RootStackScreenProps<'About'>>()

  beforeEach(() => {
    renderScreen(
      AboutPage,
      {
        navigation: props.navigation,
        route: props.route,
      } as unknown as RootStackScreenProps<'About'>,
      PaperProvider,
    )
  })

  it('should render "back to home" button', () => {
    expect(screen.getByText(/back to home/i)).toBeOnTheScreen()
  })

  it('should navigate back when pressing "go to home" button', () => {
    fireEvent.press(screen.getByText(/back to home/i))
    expect(props.navigation.goBack).toHaveBeenCalled()
  })

  it('should display alert when pressing info action button', () => {
    jest.spyOn(Alert, 'alert')
    fireEvent.press(screen.getByLabelText(/display info/i))

    waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Alert!',
        'You pressed me. thanks!',
      )
    })
  })
})
