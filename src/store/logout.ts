import { store, persistor } from './index'
import * as SecureStore from 'expo-secure-store'
import FastImage from 'react-native-fast-image'

import ConfigRTK from './config'
import UserRTK from './user'
import FeedRTK from './feed'
import TankRTK from './tank'

export default async () => {
  const { dispatch } = store

  await FastImage.clearDiskCache()
  await FastImage.clearMemoryCache()
  dispatch(ConfigRTK.actions.logout())
  await SecureStore.deleteItemAsync('accessToken')
  await SecureStore.deleteItemAsync('refreshToken')

  dispatch(UserRTK.actions.logout())
  dispatch(FeedRTK.actions.logout())
  dispatch(TankRTK.actions.logout())

  persistor.purge()
}
