import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as PaperProvider, configureFonts } from 'react-native-paper'
import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_900Black_Italic,
  Roboto_900Black,
  Roboto_700Bold_Italic,
  Roboto_700Bold,
  Roboto_500Medium_Italic,
  Roboto_500Medium,
  Roboto_400Regular_Italic,
  Roboto_300Light_Italic,
  Roboto_300Light,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto'
import AppLoading from 'expo-app-loading'

import Alert from './view/components/alert'
import Drawer from './view/components/drawer'
// import AppLoading from './view/components/fakeLoadingScreen'
import { store, persistor } from './store'
import theme from './theme'
import Routes from './routes'

const myTheme = {
  ...theme,
  fonts: configureFonts({ default: { ...theme.fonts } }),
}

const App: React.FC = () => {
  const [isReady] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_900Black_Italic,
    Roboto_900Black,
    Roboto_700Bold_Italic,
    Roboto_700Bold,
    Roboto_500Medium_Italic,
    Roboto_500Medium,
    Roboto_400Regular_Italic,
    Roboto_300Light_Italic,
    Roboto_300Light,
    Roboto_400Regular,
  })

  if (!isReady) {
    return <AppLoading />
  }

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
