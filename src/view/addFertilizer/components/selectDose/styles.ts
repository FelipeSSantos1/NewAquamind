import styled from 'styled-components/native'
import { Button as PaperButton } from 'react-native-paper'

export const Button = styled(PaperButton).attrs({
  compact: true,
  mode: 'text',
})`
  min-width: 76px;
`
export const ViewRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`
