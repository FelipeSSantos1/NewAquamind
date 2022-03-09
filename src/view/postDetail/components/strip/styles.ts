import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { Avatar as PaperAvatar, Text } from 'react-native-paper'

import { RowViewType } from './types'
import theme from '../../../../theme'

export const RowView = styled.View<RowViewType>`
  flex-direction: row;
  align-items: center;
  margin-left: ${props => (props.sub ? 30 : 0)}px;
  background-color: ${props => (props.highlight ? theme.colors.accentBackground : 'transparent')};
`
export const Avatar = styled(PaperAvatar.Image)`
  background-color: transparent;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${theme.colors.text};
  margin: ${theme.sizes.padding / 2}px 0;
`
export const TextUserName = styled(Text)`
  font-family: ${theme.fonts.medium.fontFamily};
`
export const TextMessage = styled(Text)`
  margin-left: ${theme.sizes.padding / 2}px;
  flex: 1;
  flex-wrap: wrap;
`
export const ContentView = styled.View`
  min-height: 50px;
  flex: 1;
`
export const FooterText = styled(Text)`
  margin: 0 ${theme.sizes.padding / 2}px;
  color: ${theme.colors.lightText};
  font-family: ${theme.fonts.light.fontFamily};
  font-size: ${theme.fonts.sizes.small}px;
`
export const FooterRowView = styled(RowView)`
  margin: ${theme.sizes.margin / 2}px 0;
  flex-direction: row;
  align-items: center;
`
