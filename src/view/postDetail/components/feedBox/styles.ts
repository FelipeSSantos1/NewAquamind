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
export const DotsContainerView = styled.View`
  flex: 1;
  justify-content: space-evenly;
`
export const styles = StyleSheet.create({
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
