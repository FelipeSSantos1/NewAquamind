import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { rootReducer } from './rootReducer'

const middlewares: any[] = []
if (__DEV__) {
  const createDebugger = require('redux-flipper').default
  middlewares.push(createDebugger())
  // const logger = store => next => action => {
  //   console.group(action.type)
  //   console.info('dispatching', action)
  //   const result = next(action)
  //   console.log('next state', store.getState())
  //   console.groupEnd()
  //   return result
  // }
  // middlewares.push(logger)
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['config.alert.okPress'],
        ignoredActionPaths: ['payload.okPress'],
      },
    }).concat(middlewares),
})

const persistor = persistStore(store)

export { store, persistor }
