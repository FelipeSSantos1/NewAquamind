import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as PaperProvider, configureFonts } from 'react-native-paper'
import { StatusBar } from 'react-native'

import Alert from './view/components/alert'
import Drawer from './view/components/drawer'
import AppLoading from './view/components/fakeLoadingScreen'
import { store, persistor } from './store'
import theme from './theme'
import Routes from './routes'

const myTheme = {
  ...theme,
  fonts: configureFonts({ default: { ...theme.fonts } }),
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={myTheme}>
        <NavigationContainer>
          <PersistGate loading={<AppLoading />} persistor={persistor}>
            <StatusBar barStyle="light-content" />
            <Routes />
            <Drawer />
            <Alert />
          </PersistGate>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}

export default App
