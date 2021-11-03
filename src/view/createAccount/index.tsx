import React, { useState, useRef } from 'react'
import { Formik, FormikHelpers } from 'formik'
import { useDispatch } from 'react-redux'
import { Platform, TextInput } from 'react-native'
import { Portal, Dialog } from 'react-native-paper'

import { NavPropsCreateAccount } from '../../routes/types'
import * as authAPI from '../../API/auth'
import { FormValidation, FormData, FormResendValidation } from './types'
import ConfigRTK from '../../store/config'
import Input from '../components/input'
import headerImage from '../../assets/appImages/loginHeader.png'
import theme from '../../theme'

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
  PaperButton,
} from './styles'

const CreateAccount: React.FC<NavPropsCreateAccount> = ({ navigation }) => {
  const dispatch = useDispatch()
  const [createIsLoading, setCreateIsLoading] = useState(false)
  const [sendIsLoading, setSendIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const passwordInputRef = useRef<typeof Input & TextInput>(null)
  const confirmPasswordInputRef = useRef<typeof Input & TextInput>(null)
  //confirmPasswordInputRef

  const resendEmail = async ({ email }: { email: string }) => {
    setSendIsLoading(true)
    const result = await authAPI.resendEmail({ email })
    setSendIsLoading(false)
    setShowModal(false)

    if (!result) {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: 'Something went wrong, try again',
          okText: 'Ok',
          okPress: () => {
            dispatch(ConfigRTK.actions.hideAlert())
            setShowModal(true)
          },
        })
      )
      return
    }

    if (typeof result !== 'boolean') {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: result.message,
          okText: 'Ok',
          okPress: () => {
            dispatch(ConfigRTK.actions.hideAlert())
            setShowModal(true)
          },
        })
      )
    } else {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Success!',
          alertMessage: `An email for validate your account was sent to ${email}. Check also your spam folder, just in case.`,
          okText: 'Ok',
        })
      )
    }
  }

  const createAccount = async (
    values: FormData,
    actions: FormikHelpers<FormData>
  ) => {
    setCreateIsLoading(true)
    const result = await authAPI.createAccount(values)
    setCreateIsLoading(false)

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
    } else {
      actions.resetForm({
        values: { email: values.email, confirmPassword: '', password: '' },
      })

      if (result.emailSent) {
        dispatch(
          ConfigRTK.actions.setAlert({
            visible: true,
            alertTitle: 'Success',
            alertMessage: `Your account was created. Please follow the instructions on email that was sent to ${values.email} to validate it`,
            okText: 'Ok',
          })
        )
        return
      }
    }
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
            <AppTitle>Create Account</AppTitle>
          </AppNameView>

          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values, actions) => createAccount(values, actions)}
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
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />
                <Input
                  label="Password"
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  value={values.password}
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  secureTextEntry
                  forwardRef={passwordInputRef}
                  onSubmitEditing={() =>
                    confirmPasswordInputRef.current?.focus()
                  }
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
                  disabled={!isValid || createIsLoading}
                  loading={createIsLoading}
                >
                  Create Account
                </LoginButton>
              </>
            )}
          </Formik>
          <RowView>
            <SecondaryButton
              onPress={() => setShowModal(true)}
              color={theme.colors.accent}
            >
              Didn't received the email? Resend it!
            </SecondaryButton>
          </RowView>
          <RowView>
            <SecondaryButton onPress={() => navigation.goBack()}>
              Go to Login
            </SecondaryButton>
          </RowView>
        </Container>
      </ScrollView>

      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={resendEmail}
        validationSchema={FormResendValidation}
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
          <Portal>
            <Dialog visible={showModal} onDismiss={() => setShowModal(false)}>
              <Dialog.Title>Send a new email to</Dialog.Title>

              <Dialog.Content>
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
                />
              </Dialog.Content>
              <Dialog.Actions>
                <PaperButton
                  color={theme.colors.error}
                  onPress={() => setShowModal(false)}
                >
                  Cancel
                </PaperButton>
                <PaperButton
                  onPress={handleSubmit}
                  disabled={!isValid || sendIsLoading}
                >
                  Send
                </PaperButton>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
      </Formik>
    </KeyboardAvoidingView>
  )
}

export default CreateAccount
