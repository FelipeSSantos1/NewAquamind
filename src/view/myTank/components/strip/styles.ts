import styled from 'styled-components/native'
import { Text, Button, TouchableRipple } from 'react-native-paper'
import FastImage from 'react-native-fast-image'

import theme from '../../../../theme'

export const TankView = styled.View`
  flex: 1;
  margin-left: ${theme.sizes.pagePadding}px;
`
export const Icon = styled(Button).attrs({
  color: theme.colors.surface,
})`
  margin: 0;
`
export const SpecButton = styled(TouchableRipple)`
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
  flex: 1;
`
export const DeleteButton = styled(TouchableRipple)`
  background-color: ${theme.colors.error};
  align-items: center;
  justify-content: center;
  flex: 1;
`
export const UpdateButton = styled(TouchableRipple)`
  background-color: ${theme.colors.text};
  align-items: center;
  justify-content: center;
  flex: 1;
`
export const Container = styled.View`
  background-color: ${theme.colors.surface};
  flex: 1;
`
export const FooterView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
export const MainView = styled(TouchableRipple)`
  flex-direction: row;
  padding: ${theme.sizes.margin / 2}px 0;
`
export const TankHeaderView = styled.View`
  flex-direction: row;
  padding: ${theme.sizes.margin / 2}px 0;
  flex-direction: row;
`
export const TankHeaderDetailView = styled.View`
  flex: 1;
  margin-left: ${theme.sizes.margin}px;
`
export const TankHeaderTitle = styled(Text)`
  color: ${theme.colors.primary};
  font-weight: ${theme.fonts.medium.fontWeight};
`
export const TankHeaderText = styled(Text)`
  color: ${theme.colors.text};
  font-weight: ${theme.fonts.light.fontWeight};
`
export const TankHeaderThumb = styled(FastImage)`
  width: ${50}px;
  height: ${50}px;
  border-radius: ${theme.roundness}px;
  align-self: center;
`
export const TankComments = styled(TankHeaderText)`
  align-self: flex-end;
`
