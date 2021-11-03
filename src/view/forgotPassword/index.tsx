import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Network from 'expo-network'

import { NavPropsForgotPassword } from '../../routes/types'
import * as authAPI from '../../API/auth'
import ConfigRTK from '../../store/config'
import Input from '../components/input'
import headerImage from '../../assets/appImages/loginHeader.png'
import { formValidation, FormData } from './types'
import {
  Container,
  AppNameView,
  AppTitle,
  AppSubTitle,
  ImageHeader,
  LoginButton,
  RowView,
  SecondaryButton,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from './styles'
import { Formik, FormikHelpers } from 'formik'

const ForgotPassword: React.FC<NavPropsForgotPassword> = ({ navigation }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const resetPassword = async (
    { email }: FormData,
    actions: FormikHelpers<FormData>
  ) => {
    const device = `${Device.brand} - ${Device.modelName} - ${Device.osName} ${Device.osVersion}`
    const ip = await Network.getIpAddressAsync()
    setIsLoading(true)
    const result = await authAPI.forgotPassword({ email, ip, device })
    setIsLoading(false)

    if (!result) {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: 'Something went wrong, try again',
          okText: 'Ok',
        })
      )
      return
    }

    if ('statusCode' in result) {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: result.message,
          okText: 'Ok',
        })
      )
      return
    }

    dispatch(
      ConfigRTK.actions.setAlert({
        visible: true,
        alertTitle: 'Success',
        alertMessage: `Follow instructions sent to ${email} email`,
        okText: 'Ok',
      })
    )
    actions.resetForm()
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <ImageHeader source={headerImage} resizeMode="cover" />
        <Container>
          <AppNameView>
            <AppSubTitle> </AppSubTitle>
            <AppTitle>Forgot Password</AppTitle>
          </AppNameView>
          <Text>Enter your e-mail address</Text>
          <Text>
            We will e-mail you with instructions to reset your password
          </Text>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={(values, actions) => resetPassword(values, actions)}
            validationSchema={formValidation}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <>
                <Input
                  label="E-mail"
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  value={values.email}
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  onSubmitEditing={handleSubmit}
                  returnKeyType="go"
                />
                <LoginButton
                  onPress={handleSubmit}
                  mode="contained"
                  disabled={!isValid || isLoading}
                  loading={isLoading}
                >
                  Reset Password
                </LoginButton>
              </>
            )}
          </Formik>
          <RowView>
            <SecondaryButton onPress={() => navigation.goBack()}>
              Go to Login
            </SecondaryButton>
          </RowView>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ForgotPassword
