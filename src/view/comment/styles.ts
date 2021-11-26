import styled from 'styled-components/native'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { TextInput, Avatar } from 'react-native-paper'

import theme from '../../theme'

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`
export const PaperTextInput = styled(TextInput)`
  flex: 1;
  margin-left: ${theme.sizes.margin}px;
  max-height: 100px;
`
export const RowView = styled.View`
  flex-direction: row;
  align-items: flex-end;
  background-color: ${theme.colors.darkenBackground};
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-top-color: ${theme.colors.disabled};
`
export const PaperAvatar = styled(Avatar.Image)`
  background-color: transparent;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${theme.colors.text};
  margin: ${theme.sizes.padding / 2}px 0;
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
