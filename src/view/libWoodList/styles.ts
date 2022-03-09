import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Searchbar as PaperSearchbar, Text as PaperText, Divider } from 'react-native-paper'

import theme from '../../theme'

export const MainView = styled.View`
  flex: 1;
  background-color: ${theme.colors.surface};
  padding: ${theme.sizes.pagePadding}px;
`
export const Searchbar = styled(PaperSearchbar)`
  margin-bottom: ${theme.sizes.margin}px;
`
export const CommonName = styled(PaperText)`
  font-family: ${theme.fonts.medium.fontFamily};
`
export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${theme.sizes.width - theme.sizes.pagePadding * 2}px;
`
export const RowViewText = styled(RowView)`
  width: ${theme.sizes.width - 80 - theme.sizes.margin}px;
  justify-content: flex-start;
  align-items: center;
`
export const ContentDescription = styled.View`
  flex: 1;
`
export const ThumbImage = styled(FastImage)`
  width: ${50}px;
  height: ${50}px;
  border-radius: ${theme.roundness}px;
  margin-right: ${theme.sizes.margin}px;
`
export const PaperDivider = styled(Divider)`
  margin: ${theme.sizes.margin}px 0;
`
