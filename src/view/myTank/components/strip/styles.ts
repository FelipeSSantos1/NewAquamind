import styled from 'styled-components/native'
import { Text, IconButton, TouchableRipple } from 'react-native-paper'

import theme from '../../../../theme'

export const TankView = styled.View`
  flex: 1;
  margin-left: ${theme.sizes.pagePadding}px;
`
export const MainView = styled(TouchableRipple)`
  flex-direction: row;
  background-color: ${theme.colors.surface};
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
export const TankHeaderThumb = styled.Image`
  width: ${50}px;
  height: ${50}px;
  border-radius: ${theme.roundness}px;
  align-self: center;
`
export const TankComments = styled(TankHeaderText)`
  align-self: flex-end;
`
export const ChevronIcon = styled(IconButton).attrs({
  color: theme.colors.placeholder,
})`
  align-self: center;
`
