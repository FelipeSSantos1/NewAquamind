import styled from 'styled-components/native'
import { Surface, Title, TouchableRipple } from 'react-native-paper'

import theme from '../../theme'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.darkenBackground};
`
export const PaperTitle = styled(Title)``
export const RowView = styled.View`
  flex-direction: row;
`
export const Image = styled.Image`
  width: ${theme.sizes.width / 5}px;
  height: ${theme.sizes.width / 5}px;
`
export const PaperContainer = styled(Surface)`
  padding: ${theme.sizes.padding}px;
  border-radius: ${theme.roundness}px;
  align-items: center;
  justify-content: center;
  flex: 1;
`
export const PaperTouchableRipple = styled(TouchableRipple)`
  margin: ${theme.sizes.margin}px;
  border-radius: ${theme.roundness}px;
  flex: 1;
`
