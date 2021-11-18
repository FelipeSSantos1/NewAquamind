import { DefaultTheme, Colors } from 'react-native-paper'
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

type MyTheme = typeof DefaultTheme & {
  sizes: {
    margin: number
    padding: number
    pagePadding: number
    width: number
    height: number
  }
  colors: {
    green: string
    lightText: string
    accentBackground: string
  }
  fonts: {
    sizes: {
      xxsmall: number
      small: number
      regular: number
      medium: number
      large: number
    }
  }
}
// https://coolors.co/086bdb
// Roboto_100Thin,
// Roboto_100Thin_Italic,
// Roboto_900Black_Italic,
// Roboto_900Black,
// Roboto_700Bold_Italic,
// Roboto_700Bold,
// Roboto_500Medium_Italic,
// Roboto_500Medium,
// Roboto_400Regular_Italic,
// Roboto_300Light_Italic,
// Roboto_300Light,
// Roboto_400Regular
const theme: MyTheme = {
  ...DefaultTheme,
  fonts: {
    regular: {
      fontFamily: 'Roboto_400Regular',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Roboto_500Medium',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'Roboto_300Light',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Roboto_100Thin',
      fontWeight: '100',
    },
    sizes: {
      xxsmall: 12,
      small: 13,
      regular: 14,
      medium: 15,
      large: 18,
    },
  },
  colors: {
    primary: '#086BDB',
    green: '#245F5C',
    accent: '#8250DD',
    background: '#F7F9FF',
    surface: Colors.white,
    error: '#CF2B53',
    text: '#434655',
    lightText: '#59696F',
    onSurface: Colors.black,
    disabled: '#A8AABC',
    placeholder: '#9799AB',
    backdrop: 'rgba(0, 0, 0, 0.50)',
    notification: '#002583',
    accentBackground: '#EEE8A9',
  },
  sizes: {
    margin: 10,
    padding: 10,
    pagePadding: 20,
    width,
    height,
  },
}

export default theme
