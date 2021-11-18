import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

import { Colors, TextInput, Title, Button } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'

import theme from '../../theme'

const { width } = Dimensions.get('window')
export const Container = styled.ScrollView`
  flex: 1;
`
export const Content = styled.View`
  flex: 1;
`
export const ImageScrollView = styled.ScrollView`
  height: ${width / 5 + theme.sizes.margin * 2}px;
  background-color: ${Colors.blueGrey100};
`
export const PaperTextInput = styled(TextInput)`
  flex: 1;
  margin: ${theme.sizes.margin}px;
  max-height: 100px;
`
export const PaperPickerLabel = styled(Title)`
  margin-left: ${theme.sizes.margin}px;
`
export const StyledPicker = styled(Picker)`
  margin: 0 ${theme.sizes.margin}px;
  background-color: ${theme.colors.background};
`
export const SaveButon = styled(Button)`
  margin: ${theme.sizes.margin}px ${theme.sizes.margin}px 0
    ${theme.sizes.margin}px;
`
export const PaperKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`
