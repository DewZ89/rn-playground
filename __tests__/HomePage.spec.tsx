import { renderScreen } from '../tests/utils'
import HomePage from '../app/screens/home'
import { RootStackScreenProps } from '../types/navigation'
import { fireEvent, screen, waitFor } from '@testing-library/react-native'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PaperProvider } from 'react-native-paper'

describe('HomePage', () => {
  const props: DeepMockProxy<RootStackScreenProps<'Home'>> =
    mockDeep<RootStackScreenProps<'Home'>>()

  beforeEach(() => {
    renderScreen(
      HomePage,
      { navigation: props.navigation, route: props.route },
      PaperProvider,
    )
  })

  describe('render', () => {
    it('should render title', () => {
      expect(screen.getByText(/welcome to rn playground!/i)).toBeOnTheScreen()
    })
    it('should render "show maps" button', () => {
      expect(screen.getByText(/show maps/i)).toBeOnTheScreen()
    })
    it('should render "go to about" button', () => {
      expect(screen.getByText(/go to about/i)).toBeOnTheScreen()
    })
  })

  describe('navigating to about', () => {
    it('should navigate when pressing "go to about" button', async () => {
      props.navigation.navigate.mockReset().mockReturnValueOnce(undefined)

      await waitFor(() => {
        fireEvent(screen.getByText(/go to about/i), 'press')
        expect(props.navigation.navigate).toHaveBeenCalledWith('About')
      })
    })
    it('should navigate to maps page when pressing "show maps" button', async () => {
      props.navigation.navigate.mockReset().mockReturnValueOnce(undefined)

      await waitFor(() => {
        fireEvent(screen.getByText(/show maps/i), 'press')
        expect(props.navigation.navigate).toHaveBeenCalledWith('Maps')
      })
    })
  })
})
