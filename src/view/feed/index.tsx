import React from 'react'
import { View, Text } from 'react-native'

import { NavPropsFeed } from '../../routes/types'

const Feed: React.FC<NavPropsFeed> = ({ navigation }) => {
  // const dispatch = useDispatch()
  // const logout = () => {
  //   dispatch(UserRTK.actions.logout())
  //   navigation.navigate('Auth')
  //   navigation.dispatch(state => {
  //     return CommonActions.reset({
  //       ...state,
  //       index: 0,
  //     })
  //   })
  // }
  return (
    <View>
      <Text>Feed</Text>
    </View>
  )
}

export default Feed
