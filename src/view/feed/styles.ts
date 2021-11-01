import styled from 'styled-components/native'

import theme from '../../theme'

export const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.surface};
`
type FeedImageProps = {
  width: number
  height: number
}
export const FeedImage = styled.Image<FeedImageProps>`
  width: ${theme.sizes.width}px;
  height: ${props => theme.sizes.width * (props.height / props.width)}px;
`
