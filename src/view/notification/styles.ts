import styled from 'styled-components/native'
import { Text, TouchableRipple } from 'react-native-paper'

import theme from '../../theme'

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`
export const StyledFlatList = styled.FlatList`
  flex: 1;
  background-color: ${theme.colors.background};
`
export const StyledPressable = styled(TouchableRipple)`
  flex-direction: row;
  align-items: center;
`
export const TitleContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: flex-start;
  margin-right: ${theme.sizes.margin / 2}px;
`
export const MessageContent = styled.View`
  flex: 1;
`
export const DateText = styled(Text)`
  color: ${theme.colors.lightText};
`
