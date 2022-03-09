import styled from 'styled-components/native'
import { Dimensions, StyleSheet } from 'react-native'
import { IconButton, TouchableRipple } from 'react-native-paper'

import theme from '../../../../theme'

const { width } = Dimensions.get('window')
export const ImageBox = styled.View`
  width: ${width / 5}px;
  height: ${width / 5}px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${theme.colors.disabled};
  padding: ${theme.sizes.padding / 3}px;
  margin: ${theme.sizes.padding}px 0 ${theme.sizes.padding}px ${theme.sizes.padding}px;
  background-color: ${theme.colors.surface};
`
export const ImageBoxImage = styled.Image`
  flex: 1;
`
export const PaperIconButton = styled(IconButton)`
  align-self: center;
  justify-self: center;
  margin: auto;
`
export const PaperIconButtonAbsolute = styled(IconButton)`
  position: absolute;
  left: ${width / 10 - 30 - theme.sizes.padding / 6}px;
  top: ${width / 10 - 30 - theme.sizes.padding / 6}px;
`
export const PaperTouchableRipple = styled(TouchableRipple)`
  flex: 1;
  background-color: ${theme.colors.disabled};
`
