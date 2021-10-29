import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { CommonActions } from '@react-navigation/native'

import { NavPropsFeed } from '../../routes/types'
import UserRTK from '../../store/user'
import { LoginButton } from './styles'

const Feed: React.FC<NavPropsFeed> = ({ navigation }) => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(UserRTK.actions.logout())
    navigation.navigate('Auth')
    navigation.dispatch(state => {
      return CommonActions.reset({
        ...state,
        index: 0,
      })
    })
  }
  return (
    <View>
      <Text>Feed</Text>
      <LoginButton mode="contained" onPress={() => logout()}>
        Login
      </LoginButton>
    </View>
  )
}

export default Feed
