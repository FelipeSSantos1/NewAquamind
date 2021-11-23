import React from 'react'
import { Platform } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { Image } from 'react-native-compressor'
import * as ImagePicker from 'expo-image-picker'

import * as API from '../../API/user'
import FakeLoadingScreen from '../components/fakeLoadingScreen'
import UserRTK from '../../store/user'
import ConfigRTK from '../../store/config'
import Input from '../components/input'
import { FormValidation, FormData } from './types'
import { fullImageUrl } from '../../services/helper'
import { NavPropsProfile } from '../../routes/types'
import { RootState } from 'store/rootReducer'
import theme from '../../theme'
import {
  MainView,
  Avatar,
  HeaderView,
  CameraIcon,
  CameraIconBkg,
  HeaderSlotView,
  HeaderSlot,
  HeaderRowView,
  PaperKeyboardAvoidingView,
  FormView,
  PaperButton,
} from './styles'

const Profile: React.FC<NavPropsProfile> = () => {
  const dispatch = useDispatch()
  const [ready, setReady] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [initialValues, setinitialValues] = React.useState({
    name: '',
    username: '',
    country: '',
    bio: '',
  })
  const { user } = useSelector((state: RootState) => state)

  React.useEffect(() => {
    const fetch = async () => {
      const response = await API.getProfile()
      if (!response || 'statusCode' in response) {
        dispatch(
          ConfigRTK.actions.setAlert({
            visible: true,
            alertTitle: 'Oops!',
            alertMessage:
              'Something went wrong, check your internet connection and try it again',
            okText: 'Ok',
          })
        )
        return
      }
      dispatch(UserRTK.actions.setProfile(response))
      setinitialValues({
        name: response.name || '',
        username: response.username,
        country: response.country || '',
        bio: response.bio || '',
      })
      setReady(true)
    }
    fetch()
  }, [dispatch])

  const takePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: 'We need media roll permissions to make this work!',
          okText: 'Ok',
        })
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.cancelled) {
      dispatch(
        ConfigRTK.actions.setLoading({
          visible: true,
          loadingMessage: 'Uploading Image',
        })
      )

      const compressed = await Image.compress(result.uri, {
        compressionMethod: 'auto',
        returnableOutputType: 'base64',
      })

      const response = await API.updatePhoto({ avatar: compressed })
      if (!response) {
        dispatch(ConfigRTK.actions.setLoading({ visible: false }))
        dispatch(
          ConfigRTK.actions.setAlert({
            visible: true,
            alertTitle: 'Oops!',
            alertMessage:
              'Something went wrong on upload photo process, try again!',
            okText: 'Ok',
          })
        )
        return
      }
      if ('statusCode' in response) {
        dispatch(ConfigRTK.actions.setLoading({ visible: false }))
        dispatch(
          ConfigRTK.actions.setAlert({
            visible: true,
            alertTitle: 'Oops!',
            alertMessage: response.message,
            okText: 'Ok',
          })
        )
        return
      }

      const profileResponse = await API.getProfile()
      if (!profileResponse || 'statusCode' in profileResponse) {
        ConfigRTK.actions.setLoading({ visible: false })
        return
      }

      dispatch(UserRTK.actions.setProfile(profileResponse))
      dispatch(ConfigRTK.actions.setLoading({ visible: false }))
    }
  }

  const updateProfile = async (values: FormData) => {
    setLoading(true)
    values.username = _.replace(_.deburr(values.username), /[^a-z0-9_-]/g, '')
    const response = await API.updateProfile(values)
    if (!response) {
      setLoading(false)
      return
    }
    if ('statusCode' in response) {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: response.message,
          okText: 'Ok',
        })
      )
      setLoading(false)
      return
    }
    dispatch(UserRTK.actions.setProfile(response))
    setLoading(false)
  }

  if (!ready) {
    return <FakeLoadingScreen />
  }

  return (
    <PaperKeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 92 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <MainView>
        <HeaderRowView>
          <TouchableRipple
            onPress={() => takePicture()}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          >
            <HeaderView>
              <Avatar source={fullImageUrl(user.Profile.avatar)} />
              <CameraIconBkg>
                <CameraIcon
                  icon="plus-box-multiple"
                  color={theme.colors.surface}
                  onPress={() => takePicture()}
                  hasTVPreferredFocus={undefined}
                  tvParallaxProperties={undefined}
                />
              </CameraIconBkg>
            </HeaderView>
          </TouchableRipple>
          <HeaderSlotView>
            <HeaderSlot label="Tanks" value={user._count?.Tanks || 0} />
            <HeaderSlot label="Posts" value={user._count?.Posts || 0} />
            <HeaderSlot label="Comments" value={user._count?.Comment || 0} />
          </HeaderSlotView>
        </HeaderRowView>
        <Formik
          initialValues={initialValues}
          onSubmit={values => updateProfile(values)}
          validationSchema={FormValidation}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            handleSubmit,
          }) => (
            <FormView>
              <Input
                label="Name"
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                value={values.name}
                error={touched.name && errors.name ? errors.name : undefined}
                autoCorrect={false}
              />
              <Input
                label="Username"
                onChangeText={text =>
                  handleChange('username')(
                    _.replace(_.deburr(text), /[^a-z0-9_-]/g, '')
                  )
                }
                onBlur={() => setFieldTouched('username')}
                value={values.username}
                error={
                  touched.username && errors.username
                    ? errors.username
                    : undefined
                }
                autoCorrect={false}
                autoCapitalize="none"
              />
              <Input
                label="Country"
                onChangeText={handleChange('country')}
                onBlur={() => setFieldTouched('country')}
                value={values.country}
                error={
                  touched.country && errors.country ? errors.country : undefined
                }
              />
              <Input
                label="Bio"
                onChangeText={handleChange('bio')}
                onBlur={() => setFieldTouched('bio')}
                multiline={true}
                numberOfLines={5}
                value={values.bio}
                error={touched.bio && errors.bio ? errors.bio : undefined}
              />
              <PaperButton
                onPress={_.debounce(() => handleSubmit(), 300)}
                disabled={loading}
                loading={loading}
              >
                Save
              </PaperButton>
            </FormView>
          )}
        </Formik>
      </MainView>
    </PaperKeyboardAvoidingView>
  )
}

export default Profile
