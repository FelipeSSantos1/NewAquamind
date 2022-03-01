import styled from 'styled-components/native'
import { Text, Title } from 'react-native-paper'
import FastImage from 'react-native-fast-image'

import theme from '../../theme'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.background};
`
export const TextContainer = styled.View`
  flex: 1;
  padding: ${theme.sizes.padding}px;
`
export const PaperText = styled(Text)``
export const PaperSource = styled(PaperText)`
  margin-top: ${theme.sizes.margin * 2}px;
  align-self: flex-end;
  font-style: italic;
`
export const CommonName = styled(Title)`
  align-self: center;
  margin-bottom: ${theme.sizes.margin}px;
`
export const PaperImage = styled(FastImage)`
  width: 100%;
  height: 200px;
`
