import styled from 'styled-components/native'
import {
  TextInput as PaperTextInput,
  ActivityIndicator,
} from 'react-native-paper'

import { TextInputProps, SpinnerInputProps } from './types'
import theme from '../../../theme'

export const TextInput = styled(PaperTextInput)<TextInputProps>`
  margin-bottom: ${props => (props.extraMargin ? 0 : theme.sizes.margin / 2)}px;
`
export const Spinner = styled(ActivityIndicator)<SpinnerInputProps>`
  top: 15px;
  right: 10px;
  align-self: flex-end;
  position: absolute;
`
