import styled from 'styled-components/native'
import { IconButton, Button } from 'react-native-paper'

import theme from '../Theme'

export const MainView = styled.View`
  flex: 1;
  background-color: ${theme.colors.surface};
`
export const HeaderView = styled.View`
  height: ${theme.sizes.width / 3}px;
  background-color: ${theme.colors.primary};
  margin-bottom: 50px;
`
export const Avatar = styled.Image`
  width: ${theme.sizes.width / 2.6}px;
  height: ${theme.sizes.width / 2.6}px;
  border-radius: ${theme.sizes.width / 2.6 / 2}px;
  border-width: 3px;
  border-color: ${theme.colors.surface};
  align-self: center;
`
export const PhotoIcon = styled(IconButton)`
  align-self: center;
  top: -${theme.sizes.width / 3.2}px;
`
export const FormView = styled.View`
  padding: 0 ${theme.sizes.pagePadding}px;
  flex: 1;
`
export const SaveButton = styled(Button)`
  margin: ${theme.sizes.margin}px 0 ${theme.sizes.margin * 2}px 0;
`
