import styled from 'styled-components/native'

import {
  Title,
  ActivityIndicator,
  Button,
  IconButton,
} from 'react-native-paper'
import theme from '../../theme'

export const Container = styled.SafeAreaView`
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: space-evenly;
  flex: 1;
`
export const PaperTitle = styled(Title)`
  color: ${theme.colors.surface};
  text-align: center;
`
export const Spinner = styled(ActivityIndicator).attrs({
  color: theme.colors.surface,
})``
export const PaperButton = styled(Button).attrs({
  labelStyle: {
    fontSize: theme.fonts.sizes.xxsmall,
  },
  uppercase: false,
  mode: 'contained',
  color: theme.colors.surface,
})``
export const PaperIconButton = styled(IconButton).attrs({
  color: theme.colors.surface,
  size: 80,
})``
export const ReadyView = styled.View`
  align-items: center;
`
