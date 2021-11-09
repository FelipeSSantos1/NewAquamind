import styled from 'styled-components/native'
import { Title, IconButton, TouchableRipple } from 'react-native-paper'

import theme from '../../../../theme'

export const HeaderView = styled(TouchableRipple)`
  flex: 1;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-top: ${theme.sizes.margin}px;
`
export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`

export const PaperIconButton = styled(IconButton)``
export const PaperText = styled(Title)`
  color: ${theme.colors.surface};
  font-weight: ${theme.fonts.light.fontWeight};
`
