import styled from 'styled-components/native'
import { IconButton, TouchableRipple, Text } from 'react-native-paper'

import theme from '../../../../theme'

export const HeaderView = styled(TouchableRipple)`
  flex: 1;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-top: ${theme.sizes.margin}px;
  max-height: 40px;
`
export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`

export const PaperIconButton = styled(IconButton)``
export const PaperText = styled(Text)`
  color: ${theme.colors.surface};
`
