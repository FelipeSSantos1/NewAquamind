import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { Button, Text, IconButton } from 'react-native-paper'
import FastImage from 'react-native-fast-image'

import { SmallTextProps } from './types'
import theme from '../../theme'

export const Container = styled.ScrollView`
  flex: 1;
  padding: ${theme.sizes.padding}px;
`
export const PaperKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`
export const SubmitButton = styled(Button).attrs({
  mode: 'contained',
})`
  margin: ${theme.sizes.margin}px 0;
`
export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`
export const TankThumbImage = styled.Image`
  width: ${70}px;
  height: ${70}px;
  border-radius: ${theme.roundness}px;
  align-self: flex-start;
  margin-right: ${theme.sizes.margin}px;
`
export const FullView = styled.View`
  flex: 1;
`
export const LengthRowView = styled(RowView)`
  width: 100px;
`
export const FlatListText = styled(Text)``
export const SmallText = styled(Text)<SmallTextProps>`
  font-size: ${theme.fonts.sizes.xxsmall}px;
  margin-left: ${theme.sizes.margin / 2}px;
  margin-right: ${props => (props.marginRight ? theme.sizes.margin : 0)}px;
`
export const TankMeasurementImage = styled.Image`
  align-self: center;
  flex: 1;
`
export const StripFlatList = styled.View`
  background-color: ${theme.colors.surface};
  border-bottom-color: ${theme.colors.disabled};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`
export const Icon = styled(IconButton)`
  margin-right: ${theme.sizes.margin}px;
`
export const RowViewSpaceBetween = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`
export const ThumbImageList = styled(FastImage)`
  width: ${50}px;
  height: ${50}px;
  border-radius: ${theme.roundness}px;
  align-self: flex-start;
  margin-right: ${theme.sizes.margin}px;
`
