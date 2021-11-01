import { store, persistor } from './index'
import * as SecureStore from 'expo-secure-store'

import ConfigRTK from './config'
import UserRTK from './user'

export default async () => {
  const { dispatch } = store

  dispatch(UserRTK.actions.logout())
  dispatch(ConfigRTK.actions.logout())

  persistor.purge()
  await SecureStore.deleteItemAsync('accessToken')
  await SecureStore.deleteItemAsync('refreshToken')
}
