import styled from 'styled-components/native'
import { FAB } from 'react-native-paper'
import theme from '../../theme'

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`
export const PaperFAB = styled(FAB)`
  position: absolute;
  margin: 16px;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.primary};
`
export const BannerTop = styled.Image`
  height: ${theme.sizes.width / 3}px;
  width: 100%;
`
