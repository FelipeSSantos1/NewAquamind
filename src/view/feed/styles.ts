import styled from 'styled-components/native'

import theme from '../../theme'
import { FeedImageProps } from './types'

export const FeedImage = styled.Image<FeedImageProps>`
  width: ${theme.sizes.width}px;
  height: ${props => theme.sizes.width * (props.height / props.width)}px;
`
