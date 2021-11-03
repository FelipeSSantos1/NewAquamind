import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { Avatar as PaperAvatar, Text } from 'react-native-paper'

import { MessageStyled } from './types'
import theme from '../../theme'

const width = theme.sizes.width
export const Container = styled.View`
  flex: 1;
  margin: ${theme.sizes.padding / 2}px;
`
export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`
export const SubRowView = styled(RowView)`
  margin-left: 30px;
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
export const TextMessage = styled(Text)<MessageStyled>`
  margin-left: ${theme.sizes.padding / 2}px;
  width: ${props => {
    return props.main
      ? width - (52 + theme.sizes.padding + theme.sizes.padding / 2) + 'px'
      : width - (82 + theme.sizes.padding + theme.sizes.padding / 2) + 'px'
  }};
`
