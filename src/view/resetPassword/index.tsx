import React, { useState, useRef } from 'react'
import { Formik, FormikHelpers } from 'formik'
import { useDispatch } from 'react-redux'
import { Platform, TextInput } from 'react-native'

import { NavPropsResetPassword } from '../../routes/types'
import * as userAPI from '../../API/user'
import { FormValidation, FormData } from './types'
import ConfigRTK from '../../store/config'
import Input from '../components/input'
import headerImage from '../../assets/appImages/loginHeader.png'

import {
  Container,
  AppNameView,
  AppTitle,
  AppSubTitle,
  ImageHeader,
  LoginButton,
  RowView,
  SecondaryButton,
  KeyboardAvoidingView,
  ScrollView,
} from './styles'

const ResetPassword: React.FC<NavPropsResetPassword> = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const passwordInputRef = useRef<typeof Input & TextInput>(null)
  const confirmPasswordInputRef = useRef<typeof Input & TextInput>(null)

  const resetPassword = async (values: FormData, actions: FormikHelpers<FormData>) => {
    setLoading(true)
    const result = await userAPI.resetPassword({
      password: values.password,
      token: route.params.token,
    })
    setLoading(false)

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
          alertMessage:
            'Likelytly the link has expired. Go to forgot password and resend a new valid link',
          okText: 'Ok',
        })
      )
    } else {
      actions.resetForm({
        values: { confirmPassword: '', password: '' },
      })
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Success',
          alertMessage: 'Your password has been updated',
          okPress: () => navigation.navigate('Login'),
          okText: 'Ok',
        })
      )
      return
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageHeader source={headerImage} resizeMode="cover" />
        <Container>
          <AppNameView>
            <AppSubTitle> </AppSubTitle>
            <AppTitle>Reset Password</AppTitle>
          </AppNameView>

          <Formik
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values, actions) => resetPassword(values, actions)}
            validationSchema={FormValidation}
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
                  label="Password"
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  value={values.password}
                  error={touched.password && errors.password ? errors.password : undefined}
                  secureTextEntry
                  forwardRef={passwordInputRef}
                  onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                />
                <Input
                  label="Confirm Password"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
                  value={values.confirmPassword}
                  error={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : undefined
                  }
                  secureTextEntry
                  forwardRef={confirmPasswordInputRef}
                  onSubmitEditing={handleSubmit}
                  returnKeyType="go"
                />
                <LoginButton
                  mode="contained"
                  onPress={handleSubmit}
                  disabled={!isValid || loading}
                  loading={loading}
                >
                  Save New Password
                </LoginButton>
              </>
            )}
          </Formik>
          <RowView>
            <SecondaryButton onPress={() => navigation.navigate('Login')}>
              Go to Login
            </SecondaryButton>
          </RowView>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ResetPassword
