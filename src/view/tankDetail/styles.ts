import styled from 'styled-components/native'
import { Text, Title, Divider } from 'react-native-paper'
import FastImage from 'react-native-fast-image'

import theme from '../../theme'

export const Container = styled.View`
  background-color: ${theme.colors.surface};
  flex: 1;
  padding: ${theme.sizes.pagePadding}px;
  padding-top: ${theme.sizes.pagePadding * 2.5}px;
`
export const HeaderImage = styled(FastImage)`
  width: ${theme.sizes.width - theme.sizes.padding * 2}px;
  height: ${theme.sizes.width / 2}px;
  margin-bottom: ${theme.sizes.margin}px;
`
export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`
export const RowViewIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${theme.sizes.margin}px;
  width: ${theme.sizes.width / 2 - theme.sizes.margin * 2}px;
`
export const RowViewIconContainerOneLine = styled(RowViewIconContainer)`
  width: ${theme.sizes.width - theme.sizes.margin * 2}px;
`
export const RowViewIcon = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${theme.sizes.width / 2 - theme.sizes.margin}px;
`
export const RowViewIconOneLine = styled(RowViewIcon)`
  width: ${theme.sizes.width - theme.sizes.margin}px;
`
export const PaperText = styled(Text)`
  flex: 1;
`
export const PaperTitle = styled(Title)`
  flex: 1;
`
export const PaperAssetsText = styled(PaperText)`
  flex: 1;
  align-self: center;
`
export const PaperBoldText = styled(PaperText)`
  font-family: ${theme.fonts.medium.fontFamily};
`
export const PaperDivider = styled(Divider)`
  margin-top: ${theme.sizes.margin}px;
`
export const StyledScrollView = styled.ScrollView`
  padding: ${theme.sizes.padding}px;
  background-color: ${theme.colors.surface};
`
export const ImageIcon = styled.Image`
  width: 32px;
  height: 32px;
  margin-right: ${theme.sizes.margin / 2}px;
`
