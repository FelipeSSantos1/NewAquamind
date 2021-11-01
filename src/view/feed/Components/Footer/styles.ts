import styled from 'styled-components/native'
import { Text as PaperText } from 'react-native-paper'

import theme from '../../../../theme'

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const Text = styled(PaperText)`
  margin-left: ${theme.sizes.margin}px;
  font-family: ${theme.fonts.light.fontFamily};
  color: ${theme.colors.text};
`
