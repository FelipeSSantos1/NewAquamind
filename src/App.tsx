import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider, configureFonts } from 'react-native-paper'
import { StatusBar } from 'react-native'

import theme from './theme'
import Login from './view/login'

const myTheme = {
  ...theme,
  fonts: configureFonts({ default: { ...theme.fonts } }),
}

const App: React.FC = () => {
  return (
    <PaperProvider theme={myTheme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Login />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App
