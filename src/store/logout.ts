import { store, persistor } from './index'
import * as SecureStore from 'expo-secure-store'

import ConfigRTK from './config'
import UserRTK from './user'
import FeedRTK from './feed'

export default async () => {
  const { dispatch } = store

  dispatch(ConfigRTK.actions.logout())
  dispatch(UserRTK.actions.logout())
  dispatch(FeedRTK.actions.logout())

  persistor.purge()
  await SecureStore.deleteItemAsync('accessToken')
  await SecureStore.deleteItemAsync('refreshToken')
}
