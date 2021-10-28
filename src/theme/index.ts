import { DefaultTheme, Colors } from 'react-native-paper'
import color from 'color'
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
      fontFamily: 'Roboto-Regular',
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: '500' as '500',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: '300' as '300',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: '100' as '100',
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
    green: '#068532',
    accent: '#3308DD',
    background: Colors.indigo50,
    surface: Colors.white,
    error: '#DD3308',
    text: '#37474F',
    onSurface: Colors.black,
    disabled: color(Colors.black).alpha(0.26).rgb().string(),
    placeholder: color(Colors.black).alpha(0.54).rgb().string(),
    backdrop: color(Colors.black).alpha(0.5).rgb().string(),
    notification: '#7A08DD',
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
