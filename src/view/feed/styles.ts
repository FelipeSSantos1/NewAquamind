import styled from 'styled-components/native'
import { FAB } from 'react-native-paper'

import theme from '../../theme'

export const PaperFAB = styled(FAB)`
  position: absolute;
  margin: 16px;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.primary};
`
export const PaperFlatList = styled.FlatList`
  background-color: ${theme.colors.background};
`
