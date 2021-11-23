import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import FastImage from 'react-native-fast-image'

import theme from '../../../../theme'

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const ContentView = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.background};
`
export const BlurBackground = styled(BlurView)`
  ${StyleSheet.absoluteFill}
  justify-content: center;
  align-items: center;
`
export const PaperImage = styled(FastImage)`
  ${StyleSheet.absoluteFill}
  width: 100%;
  height: 100%;
`
export const styles = StyleSheet.create({
  dotsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  dotContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containerStyle: {
    top: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    margin: 2.5,
  },
})
