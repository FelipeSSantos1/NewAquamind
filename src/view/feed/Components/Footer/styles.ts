import styled from 'styled-components/native'
import {
  Text as PaperText,
  IconButton as PaperIconButton,
} from 'react-native-paper'

import theme from '../../../../theme'

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  z-index: 1;
`
export const Text = styled(PaperText)`
  /* margin-left: ${theme.sizes.margin}px; */
`
export const Icon = styled(PaperIconButton).attrs({
  hasTVPreferredFocus: undefined,
  tvParallaxProperties: undefined,
})``
