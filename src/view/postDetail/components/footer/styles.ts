import styled from 'styled-components/native'
import { Text as PaperText } from 'react-native-paper'

import theme from '../../../../theme'

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`
export const TextDescription = styled(PaperText)`
  margin-left: ${theme.sizes.margin}px;
  margin-top: ${theme.sizes.margin}px;
  color: ${theme.colors.text};
`
export const Text = styled(PaperText)`
  margin-right: ${theme.sizes.margin}px;
  margin-bottom: ${theme.sizes.margin}px;
  color: ${theme.colors.text};
`
export const TextUserName = styled(PaperText)`
  font-family: ${theme.fonts.medium.fontFamily};
  color: ${theme.colors.accent};
`
