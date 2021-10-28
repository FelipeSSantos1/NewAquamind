import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import * as Yup from 'yup'
import { Platform } from 'react-native'

// import { LoginProps } from '../../routes'
// import { ConfigRTK } from '../../store/config'
// import UserRTK from '../../store/user'
// import { getUser as APIGetUser } from '../../API/user'
import Input from 'view/components/Input'
import headerImage from '../../assets/appImages/loginHeader.png'
// import { YupErrorsType, checkValidation } from '../../helper'
import {
  Container,
  AppNameView,
  AppTitle,
  AppSubTitle,
  ImageHeader,
  LoginButton,
  RowView,
  SecondaryButton,
  SeparatorView,
  KeyboardAvoidingView,
  ScrollView,
} from './styles'

type FormData = {
  email: string
  password: string
}

const Login = ({ navigation }: LoginProps) => {
  // const dispatch = useDispatch()
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [errors, setErrors] = useState<YupErrorsType<FormData>>({})
  // const formValues = {
  //   email,
  //   password,
  // }
  // const validation = Yup.object({
  //   email: Yup.string().email('Invalid e-mail').required('required'),
  //   password: Yup.string().required('required'),
  // })

  // const checkLogin = async () => {
  //   // dispatch(
  //   //   setAlert({
  //   //     visible: true,
  //   //     alertTitle: 'Delete Photo',
  //   //     alertMessage: 'Are you sure that you want to delete this photo?',
  //   //     cancelText: 'Cancel',
  //   //   }),
  //   // )
  //   dispatch(ConfigRTK.actions.setLoading({ visible: true }))

  //   const resultValidation = await checkValidation(errors, formValues, validation)

  //   if (resultValidation) {
  //     setErrors(resultValidation)
  //     dispatch(ConfigRTK.actions.setLoading({ visible: false }))
  //     return
  //   }
  //   setErrors({})
  //   const response = await APIGetUser(1)
  //   if (response) {
  //     dispatch(UserRTK.actions.setUser(response))
  //     dispatch(ConfigRTK.actions.setLoading({ visible: false }))
  //     dispatch(ConfigRTK.actions.setAuthenticated(true))
  //   }
  // }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <ImageHeader source={headerImage} />
        <Container>
          <AppNameView>
            <AppSubTitle>Welcome to</AppSubTitle>
            <AppTitle>Aquamind Care</AppTitle>
          </AppNameView>
          <Input
            label="E-mail"
            onChangeText={text => {}}
            value={email}
            error={errors.email}
            keyboardType="email-address"
          />
          <Input
            label="Password"
            onChangeText={text => {}}
            value={password}
            error={errors.password}
            secureTextEntry
          />
          <LoginButton mode="contained" onPress={() => null}>
            Login
          </LoginButton>
          <RowView>
            <SecondaryButton
              onPress={() => navigation.navigate('createAccount')}>
              Create account
            </SecondaryButton>
            <SeparatorView />
            <SecondaryButton
              onPress={() => navigation.navigate('forgotPassword')}>
              Forgot Password
            </SecondaryButton>
          </RowView>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login
