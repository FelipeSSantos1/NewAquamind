import styled from 'styled-components/native'
import { Button } from 'react-native-paper'

import theme from '../../theme'

export const Container = styled.View`
  background-color: ${theme.colors.surface};
  flex: 1;
  padding: ${theme.sizes.pagePadding}px;
  padding-top: ${theme.sizes.pagePadding * 2.5}px;
`
export const HeaderImage = styled.Image`
  width: ${theme.sizes.width}px;
  height: ${theme.sizes.width / 2}px;
  margin-bottom: ${theme.sizes.margin}px;
`
export const DetailIcon = styled(Button)`
  flex: 1;
`
export const RowView = styled.View`
  flex-direction: row;
`
