import { DefaultTheme } from 'react-native-paper'
import { Dimensions } from 'react-native'
import { colord } from 'colord'

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
    darkenBackground: string
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
    accent: '#7A08DD',
    darkenBackground: colord('#434655').lighten(0.67).toHex(),
    background: '#FFF',
    surface: '#FFF',
    error: '#DD3308',
    text: '#434655',
    lightText: colord('#434655').lighten(0.12).toHex(),
    onSurface: '#000',
    disabled: colord('#434655').lighten(0.4).toHex(),
    placeholder: colord('#434655').lighten(0.3).toHex(),
    backdrop: colord('#000').alpha(0.7).toHex(),
    notification: colord('#7A08DD').darken(0.27).toHex(),
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
