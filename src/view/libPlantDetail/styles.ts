import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Text, Title } from 'react-native-paper'

import theme from '../../theme'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: ${theme.sizes.padding}px;
`
export const PaperText = styled(Text)`
  /* text-align: justify; */
`
export const PaperTitle = styled(Title)`
  margin-bottom: ${theme.sizes.margin}px;
`
export const CenterView = styled.View`
  align-items: center;
`
export const ThumbImage = styled(FastImage)`
  width: ${theme.sizes.width / 2}px;
  height: ${theme.sizes.width / 2}px;
`
export const EmptyView = styled.View`
  height: ${theme.sizes.margin * 2}px; ;
`
