import styled from 'styled-components/native'
import { IconButton, Button } from 'react-native-paper'
import FastImage from 'react-native-fast-image'

import Slot from './components/headerSlot'
import theme from '../../theme'

export const PaperKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`
export const MainView = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.surface};
`
export const HeaderView = styled.View`
  background-color: ${theme.colors.primary};
`
export const Avatar = styled(FastImage)`
  width: ${theme.sizes.width / 5}px;
  height: ${theme.sizes.width / 5}px;
  border-radius: ${theme.sizes.width / 5 / 2}px;
  border-width: 3px;
  border-color: ${theme.colors.surface};
  align-self: center;
  margin: ${theme.sizes.margin}px;
`
export const CameraIcon = styled(IconButton)``
export const CameraIconBkg = styled.View`
  width: ${theme.sizes.width / 5 - 6}px;
  height: ${theme.sizes.width / 5 - 6}px;
  border-radius: ${theme.sizes.width / 1.3 - 3}px;
  background-color: ${theme.colors.backdrop};
  align-items: center;
  justify-content: center;
  position: absolute;
  left: ${theme.sizes.margin + 3}px;
  top: ${theme.sizes.margin + 3}px;
`
export const RowView = styled.View`
  flex-direction: row;
`
export const HeaderRowView = styled(RowView)`
  background-color: ${theme.colors.primary};
  height: ${theme.sizes.width / 5 + 6 + theme.sizes.margin}px;
`
export const HeaderSlotView = styled(RowView)`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${theme.colors.primary};
  height: ${theme.sizes.width / 5 + theme.sizes.margin * 2}px;
  padding: ${theme.sizes.margin}px ${theme.sizes.margin}px
    ${theme.sizes.margin}px 0;
`
export const HeaderSlot = styled(Slot)``
export const FormView = styled.View`
  flex: 1;
  padding: ${theme.sizes.padding}px;
`
export const PaperButton = styled(Button).attrs({
  compact: true,
  mode: 'contained',
})`
  min-width: 76px;
`
