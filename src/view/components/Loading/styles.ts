import styled from 'styled-components/native'
import { ActivityIndicator, Paragraph, Dialog } from 'react-native-paper'

import theme from '../../Theme'

export const DialogContent = styled(Dialog.Content)`
  flex: 1;
  align-self: center;
  justify-content: center;
`
export const DialogView = styled(Dialog)`
  width: 60%;
  min-height: ${theme.sizes.width / 2}px;
  align-self: center;
`
export const Spinner = styled(ActivityIndicator).attrs({
  color: theme.colors.primary,
})`
  margin: ${theme.sizes.margin}px 0 0 0;
`
export const Text = styled(Paragraph)`
  margin: ${theme.sizes.margin}px 0 0 0;
  text-align: center;
`
