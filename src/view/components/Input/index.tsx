import React from 'react'
import { View, TextInputProps } from 'react-native'
import { HelperText } from 'react-native-paper'

import theme from '../../../theme'
import { InputProps } from './types'
import { PaperTextInput, Spinner } from './styles'

const Input: React.FC<InputProps & TextInputProps> = ({
  error,
  label,
  loading,
  forwardRef,
  ...extraProps
}) => {
  const hasError = !!error
  return (
    <View>
      <PaperTextInput
        mode="outlined"
        error={hasError}
        label={label}
        dense
        extraMargin={!!error}
        ref={forwardRef}
        {...extraProps}
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
