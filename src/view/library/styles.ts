import styled from 'styled-components/native'
import { Text, Surface, Title } from 'react-native-paper'

import theme from '../../theme'

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.darkenBackground};
`
export const PaperRedText = styled(Text)`
  color: ${theme.colors.error};
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
  margin: ${theme.sizes.margin}px;
  padding: ${theme.sizes.padding}px;
  flex: 1;
  border-radius: ${theme.roundness}px;
  align-items: center;
  justify-content: center;
`
