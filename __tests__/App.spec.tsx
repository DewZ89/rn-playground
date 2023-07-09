import 'react-native'
import React from 'react'
import App from '../App'
import { PreferenceProvider } from '../theme'

// Note: test renderer must be required after react-native.
import { render, screen } from '@testing-library/react-native'

describe('App.tsx', () => {
  let component

  beforeEach(() => {
    component = (
      <PreferenceProvider>
        <App />
      </PreferenceProvider>
    )
    render(component)
  })

  it('should render home page', async () => {
    expect(await screen.findByText(/hello martial!/i)).toBeOnTheScreen()
  })
})
