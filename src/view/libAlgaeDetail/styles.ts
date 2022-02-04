import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { Text, Title } from 'react-native-paper'
import { BlurView } from 'expo-blur'
import FastImage from 'react-native-fast-image'

import theme from '../../theme'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.background};
`
export const TextContainer = styled.View`
  flex: 1;
  padding: ${theme.sizes.padding}px;
`
export const PaperText = styled(Text)``
export const PaperSource = styled(PaperText)`
  margin-top: ${theme.sizes.margin * 2}px;
  align-self: flex-end;
  font-style: italic;
`
export const PaperTitle = styled(Title)`
  margin: ${theme.sizes.margin}px;
`
export const CenterView = styled.View`
  align-items: center;
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
  margin-bottom: ${theme.sizes.margin}px;
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
