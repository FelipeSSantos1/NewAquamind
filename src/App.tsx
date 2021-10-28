import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as PaperProvider, configureFonts } from 'react-native-paper'
import { StatusBar } from 'react-native'

import AppLoading from './view/components/FakeLoadingScreen'
import { store, persistor } from './store'
import theme from './theme'
import Login from './view/login'

const myTheme = {
  ...theme,
  fonts: configureFonts({ default: { ...theme.fonts } }),
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={myTheme}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <Login />
          </NavigationContainer>
        </PersistGate>
      </PaperProvider>
    </Provider>
  )
}

export default App
