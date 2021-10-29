import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Login: undefined
  CreateAccount: undefined
  ForgotPassword: undefined
}

export type LoginNavProps = NativeStackScreenProps<RootStackParamList, 'Login'>
export type CreateAccountNavProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateAccount'
>
export type ForgotPasswordNavProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>
