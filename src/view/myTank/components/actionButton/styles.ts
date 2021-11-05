import styled from 'styled-components/native'
import { Text, IconButton, TouchableRipple } from 'react-native-paper'

import theme from '../../../../theme'
import { DeleteProps } from './types'

export const StyledActionButton = styled(TouchableRipple)<DeleteProps>`
  background-color: ${props => props.bkgColor};
  align-items: center;
  justify-content: center;
  width: 70px;
  flex: 1;
`
export const Icon = styled(IconButton).attrs({
  color: theme.colors.surface,
})`
  margin: 0;
`
export const ActionButtonText = styled(Text)`
  color: ${theme.colors.surface};
`
