import styled from 'styled-components/native'
import { Image, Dimensions } from 'react-native'
import { Title, Subheading, Button } from 'react-native-paper'

import theme from '../../theme'

const { width } = Dimensions.get('window')
export const Container = styled.View`
  background-color: ${theme.colors.surface};
  flex: 1;
  padding: ${theme.sizes.pagePadding}px;
  padding-top: ${theme.sizes.pagePadding * 2.5}px;
`
export const AppNameView = styled.View`
  top: -65px;
  left: ${theme.sizes.pagePadding}px;
  position: absolute;
`
export const AppTitle = styled(Title)`
  color: ${theme.colors.primary};
  top: -9px;
`
export const AppSubTitle = styled(Subheading)`
  color: ${theme.colors.primary};
`
export const ImageHeader = styled(Image)`
  background-color: ${theme.colors.surface};
  width: ${width}px;
`
export const LoginButton = styled(Button)`
  margin: ${theme.sizes.margin}px 0;
`
export const SecondaryButton = styled(Button).attrs({
  labelStyle: {
    fontSize: theme.fonts.sizes.xxsmall,
  },
  compact: true,
  uppercase: false,
  mode: 'text',
})``
export const RowView = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
`
export const SeparatorView = styled.View`
  width: 1px;
  background-color: ${theme.colors.disabled};
`
export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${theme.colors.surface};
`
export const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.surface};
`
