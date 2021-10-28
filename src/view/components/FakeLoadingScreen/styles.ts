import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native-paper'

import theme from '../../../theme'

export const MainView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.surface};
`
export const Spinner = styled(ActivityIndicator).attrs({
  color: theme.colors.primary,
})`
  margin: ${theme.sizes.margin}px 0 0 0;
`
