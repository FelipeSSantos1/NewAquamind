import styled from 'styled-components/native'
import {
  Searchbar as PaperSearchbar,
  Text as PaperText,
  IconButton,
} from 'react-native-paper'

import theme from '../../theme'

export const MainView = styled.View`
  flex: 1;
  background-color: ${theme.colors.surface};
  padding: ${theme.sizes.pagePadding}px;
`
export const Searchbar = styled(PaperSearchbar)`
  margin-bottom: ${theme.sizes.margin}px;
`
export const Text = styled(PaperText)`
  margin: ${theme.sizes.margin}px 0;
`
export const Icon = styled(IconButton)`
  margin: 0 ${theme.sizes.margin}px 0 0;
`
export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`
