import styled from 'styled-components/native'
import { Button, Text, Title, Divider } from 'react-native-paper'

import theme from '../../theme'

export const Container = styled.View`
  background-color: ${theme.colors.surface};
  flex: 1;
  padding: ${theme.sizes.pagePadding}px;
  padding-top: ${theme.sizes.pagePadding * 2.5}px;
`
export const HeaderImage = styled.Image`
  width: ${theme.sizes.width - theme.sizes.padding * 2}px;
  height: ${theme.sizes.width / 2}px;
  margin-bottom: ${theme.sizes.margin}px;
`
export const DetailIcon = styled(Button)`
  flex: 1;
`
export const RowView = styled.View`
  flex-direction: row;
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
`
