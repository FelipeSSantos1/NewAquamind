import styled from 'styled-components/native'
import { Text as TextPaper } from 'react-native-paper'

import theme from '../../../../theme'

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.sizes.margin}px;
  width: ${theme.sizes.width}px;
  z-index: 1;
`
export const Avatar = styled.Image`
  width: 34px;
  height: 34px;
  border-radius: 17px;
`
export const Text = styled(TextPaper)`
  margin-left: ${theme.sizes.margin}px;
  font-family: ${theme.fonts.medium.fontFamily};
  font-weight: ${theme.fonts.medium.fontWeight};
`
export const Dimensions = styled(Text)`
  font-family: ${theme.fonts.regular.fontFamily};
  font-weight: ${theme.fonts.regular.fontWeight};
`
export const Date = styled(TextPaper)`
  font-family: ${theme.fonts.regular.fontFamily};
  font-weight: ${theme.fonts.regular.fontWeight};
  text-align: right;
  flex: 1;
`
