import React from 'react'
import { View, TextInputProps } from 'react-native'
import { HelperText } from 'react-native-paper'

import theme from '../../../theme'
import { InputProps } from './types'
import { TextInput, Spinner } from './styles'

const Input: React.FC<InputProps & TextInputProps> = ({
  error,
  label,
  loading,
  ...props
}) => {
  const hasError = !!error
  return (
    <View>
      <TextInput
        mode="outlined"
        error={hasError}
        label={label}
        dense
        extraMargin={!!error}
        {...props}
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
