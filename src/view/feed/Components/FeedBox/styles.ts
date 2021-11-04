import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'

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
export const PaperImage = styled.Image`
  ${StyleSheet.absoluteFill}
  width: 100%;
  height: 100%;
`
