import { TextInput } from 'react-native'

export type InputProps = {
  label: string
  error: string | undefined
  loading?: boolean
  forwardRef?: React.Ref<TextInput>
}
export type TextInputProps = {
  extraMargin: boolean
}
export type SpinnerInputProps = {
  loading?: boolean
}
