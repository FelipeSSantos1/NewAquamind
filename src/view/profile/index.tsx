import React, { useState, useCallback } from 'react'
import * as Yup from 'yup'
import { TouchableRipple } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import { pickImage } from '../../helper'
import AvatarImg from '../../assets/Avatar.png'
import { ConfigRTK } from '../../store/config'
import { ProfileProps } from '../../routes'
import { RootState } from '../../store/rootReducer'
import Input from '../Components/Input'

import theme from '../Theme'
import { MainView, HeaderView, Avatar, PhotoIcon, FormView, SaveButton } from './styles'

type FormData = {
  username: string
  name: string
}
const Profile = ({ navigation }: ProfileProps) => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const [avatar, setAvatar] = useState(user.avatar)
  const [checkingAvatar, setCheckingAvatar] = useState(false)
  const [name, setName] = useState(user.name)
  const [username, setUsername] = useState(user.username)
  const [errors, setErrors] = useState<YupErrorsType<FormData>>({})
  const formValues = { name, username }

  const validation = Yup.object({
    name: Yup.string().required('required'),
    username: Yup.string().required('required'),
  })

  const takePicture = async () => {
    const image = await pickImage()
    if (!image) {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: 'Sorry, we need camera roll permissions to make this work!',
          okText: 'Ok',
        }),
      )
      return
    }
    if (!image.cancelled) {
      setAvatar(image.uri)
    }
  }

  const Save = async () => {
    dispatch(ConfigRTK.actions.setLoading({ visible: true }))

    const resultValidation = await checkValidation(errors, formValues, validation)

    if (resultValidation) {
      setErrors(resultValidation)
      dispatch(ConfigRTK.actions.setLoading({ visible: false }))
      return
    }
    setErrors({})
    // save data

    dispatch(ConfigRTK.actions.setLoading({ visible: false }))
  }

  const checkUserName = useCallback(
    _.debounce(
      async () => {
        setCheckingAvatar(true)
        // call function to check if the typed username already exists
        // it's import to pass setCheckingAvatar to the action and perform it into the saga
        setCheckingAvatar(false)
      },
      500,
      {
        leading: false,
        trailing: true,
      },
    ),
    [],
  )

  return (
    <MainView>
      <TouchableRipple onPress={() => takePicture()}>
        <HeaderView>
          <Avatar source={avatar ? { uri: avatar } : AvatarImg} />
          <PhotoIcon icon="camera" size={60} color={theme.colors.backdrop} />
        </HeaderView>
      </TouchableRipple>
      <FormView>
        <Input
          label="Full name"
          onChangeText={text => {
            checkValidation(errors, { ...formValues, tankName: text }, validation, setErrors, true)
            setName(text)
          }}
          value={name}
          error={errors.name}
        />
        <Input
          label="Username"
          onChangeText={text => {
            checkValidation(errors, { ...formValues, tankName: text }, validation, setErrors, true)
            setUsername(text)
            checkUserName()
          }}
          loading={checkingAvatar}
          value={username}
          error={errors.username}
        />
        <SaveButton mode="contained" icon="database-check" onPress={() => Save()}>
          Save
        </SaveButton>
      </FormView>
    </MainView>
  )
}

export default Profile
