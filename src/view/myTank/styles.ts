import styled from 'styled-components/native'
import { Title } from 'react-native-paper'
import theme from '../../theme'

export const HeaderView = styled.View`
  height: ${theme.sizes.width / 3}px;
  background-color: ${theme.colors.primary};
`
export const Avatar = styled.Image`
  width: ${theme.sizes.width / 2.6}px;
  height: ${theme.sizes.width / 2.6}px;
  border-radius: ${theme.sizes.width / 2.6 / 2}px;
  border-width: 3px;
  border-color: ${theme.colors.surface};
  align-self: center;
  background-color: ${theme.colors.primary};
`
export const Container = styled.View`
  flex: 1;
`
export const HeaderTitle = styled(Title)`
  align-self: center;
  color: ${theme.colors.primary};
`
export const ContentView = styled.View`
  flex: 1;
  margin-top: ${theme.sizes.width / 2.6 - theme.sizes.width / 3}px;
`
