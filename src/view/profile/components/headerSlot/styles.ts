import styled from 'styled-components/native'
import { Text, Title as PaperTitle } from 'react-native-paper'

import theme from '../../../../theme'

export const MainView = styled.View`
  background-color: ${theme.colors.background};
  flex: 1;
  height: 100%;
  margin: 1px;
  justify-content: center;
  border-radius: ${theme.roundness}px;
`
export const Value = styled(PaperTitle)`
  align-self: center;
  margin: 0;
  font-size: ${theme.fonts.sizes.medium}px;
`
export const Label = styled(Text)`
  font-size: ${theme.fonts.sizes.xxsmall}px;
  align-self: center;
  margin: 0;
`
