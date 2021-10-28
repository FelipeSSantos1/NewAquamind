import React from 'react'
import { TextInputProps, View } from 'react-native'
import { HelperText } from 'react-native-paper'

import theme from '../../Theme'
import { TextInput, Spinner } from './styles'

// type RNPaperInputProps = React.ComponentProps<typeof TextInput>
// type InputProps = RNPaperInputProps & { error: string }
type InputProps = TextInputProps & {
  label: string
  error: string | undefined
  loading?: boolean
}

const Input: React.FC<InputProps> = ({ error, label, loading, ...props }) => {
  const hasError = !!error
  return (
    <View>
      <TextInput
        mode="outlined"
        error={hasError}
        label={label}
        dense
        {...props}
        extraMargin={!!error}
      />
      {loading && <Spinner color={theme.colors.primary} />}
      {error && (
        <HelperText type="error" visible={hasError}>
          {error}
        </HelperText>
      )}
    </View>
  )
}

export default Input
