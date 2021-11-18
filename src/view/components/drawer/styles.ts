import styled from 'styled-components/native'
import * as Animatable from 'react-native-animatable'
import { TouchableRipple, Text } from 'react-native-paper'

import theme from '../../../theme'

export const EmptyView = styled.View`
  flex: 1;
`
export const MainView = styled(Animatable.View)`
  flex: 1;
  background-color: ${theme.colors.backdrop};
`
export const DialogContent = styled(Animatable.View)`
  width: ${theme.sizes.width - 20}px;
  align-self: center;
  background-color: ${theme.colors.surface};
  border-radius: ${theme.roundness * 2}px;
  padding: ${theme.sizes.pagePadding}px;
  margin-bottom: ${theme.sizes.margin}px;
`
export const CloseButtonAnimation = styled(Animatable.View)`
  align-self: center;
  width: ${theme.sizes.width - 20}px;
  justify-content: center;
  height: 40px;
  margin-bottom: ${theme.sizes.margin}px;
`
export const CloseButton = styled(TouchableRipple)`
  align-self: center;
  background-color: ${theme.colors.surface};
  width: ${theme.sizes.width - 20}px;
  justify-content: center;
  height: 40px;
  border-radius: ${theme.roundness * 2}px;
`
export const CloseButtonText = styled(Text)`
  margin: ${theme.sizes.margin}px;
  align-self: center;
`
export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  flex: 1;
`
