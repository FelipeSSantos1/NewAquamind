import styled from 'styled-components/native'
import { TouchableRipple, IconButton, Title } from 'react-native-paper'

import theme from '../../../theme'

export const MainView = styled(TouchableRipple)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.sizes.padding}px;
`
export const PaperText = styled(Title)``
export const PaperIconButton = styled(IconButton)``
