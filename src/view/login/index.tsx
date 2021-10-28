import React from 'react'
import { Formik } from 'formik'
// import { useDispatch } from 'react-redux'
import { Platform } from 'react-native'

// import { LoginProps } from '../../routes'
// import { ConfigRTK } from '../../store/config'
// import UserRTK from '../../store/user'
// import { getUser as APIGetUser } from '../../API/user'
import Input from '../components/Input'
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
  SeparatorView,
  KeyboardAvoidingView,
  ScrollView,
} from './styles'

const Login: React.FC = () => {
  // const dispatch = useDispatch()

  const checkLogin = async (values: FormData) => {
    // dispatch(
    //   setAlert({
    //     visible: true,
    //     alertTitle: 'Delete Photo',
    //     alertMessage: 'Are you sure that you want to delete this photo?',
    //     cancelText: 'Cancel',
    //   }),
    // )
    // dispatch(ConfigRTK.actions.setLoading({ visible: true }))

    // const resultValidation = await checkValidation(errors, formValues, validation)

    // if (resultValidation) {
    //   setErrors(resultValidation)
    //   dispatch(ConfigRTK.actions.setLoading({ visible: false }))
    //   return
    // }
    // setErrors({})
    // const response = await APIGetUser(1)
    // if (response) {
    //   dispatch(UserRTK.actions.setUser(response))
    //   dispatch(ConfigRTK.actions.setLoading({ visible: false }))
    //   dispatch(ConfigRTK.actions.setAuthenticated(true))
    // }
    console.log(values)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <ImageHeader source={headerImage} resizeMode="cover" />
        <Container>
          <AppNameView>
            <AppSubTitle>Welcome to</AppSubTitle>
            <AppTitle>Aquamind Care</AppTitle>
          </AppNameView>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={checkLogin}
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
                />
                <LoginButton
                  mode="contained"
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  Login
                </LoginButton>
              </>
            )}
          </Formik>
          <RowView>
            <SecondaryButton onPress={() => null}>
              Create account
            </SecondaryButton>
            <SeparatorView />
            <SecondaryButton onPress={() => null}>
              Forgot Password
            </SecondaryButton>
          </RowView>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login
