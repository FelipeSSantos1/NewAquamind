import styled from 'styled-components/native'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { TextInput, Avatar, Text, Chip } from 'react-native-paper'

import theme from '../../theme'

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`
export const PaperTextInput = styled(TextInput)`
  flex: 1;
  max-height: 100px;
  margin-bottom: 5px;
`
export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.darkenBackground};
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-top-color: ${theme.colors.disabled};
`
export const PaperAvatar = styled(Avatar.Image)`
  background-color: transparent;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${theme.colors.text};
  margin: ${theme.sizes.padding}px;
`
export const PaperKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
`

export const ContentContainerStyle = StyleSheet.create({
  flatlist: {
    maxWidth: theme.sizes.width,
    margin: theme.sizes.margin / 2,
  },
})
export const ReplyText = styled(Text)`
  margin: 0 ${theme.sizes.padding / 2}px;
  color: ${theme.colors.lightText};
  font-family: ${theme.fonts.light.fontFamily};
  font-size: ${theme.fonts.sizes.small}px;
`
export const ReplyPaperChip = styled(Chip)`
  margin: ${theme.sizes.padding}px 0;
`
